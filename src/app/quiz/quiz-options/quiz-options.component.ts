import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import QuizOptions from '../models/quiz-options.model';
import { DEFAULT_EXCLUDED_PROPERTIES, DEFAULT_MIN_NUMBER_OF_PROPERTIES } from '../store/quiz.reducer';

@Component({
  selector: 'app-quiz-options',
  templateUrl: './quiz-options.component.html',
  styleUrls: ['./quiz-options.component.css'],
  animations: [
    trigger('show', [
      state(
        'hidden',
        style({ transform: 'translateY(calc(-100% + {{buttonHeight}}px))' }),
        {
          params: { buttonHeight: 0 },
        }
      ),
      state('revealed', style({ transform: 'translateY(0)' })),
      transition('hidden <=> revealed', animate('200ms')),
    ]),
  ],
})
export class QuizOptionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private quizOptionsSubscription$: Subscription;
  private quizOptions: QuizOptions;
  quizOptionsFormGroup: FormGroup;

  @ViewChild('toggleButton') toggleButtonRef: ElementRef;
  buttonHeight: number;

  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  toggleState = this.HIDDEN_STATE;
  private readonly SHOW_MESSAGE = 'Show';
  private readonly HIDE_MESSAGE = 'Hide';
  message = this.SHOW_MESSAGE;

  constructor(
    private store: Store<AppStoreState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.quizOptionsSubscription$ = this.store
      .select('quiz')
      .subscribe(({ quizOptions }) => {
        this.quizOptions = quizOptions;
        this.initForm();
      });
  }

  ngAfterViewInit(): void {
    this.buttonHeight = this.toggleButtonRef.nativeElement.offsetHeight;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy = (): void => this.quizOptionsSubscription$?.unsubscribe();

  private initForm(): void {
    this.quizOptionsFormGroup = new FormGroup({
      general: new FormGroup({
        numberOfQuestions: new FormControl(this.quizOptions.numberOfQuestions, [
          Validators.min(1),
        ]),
        shouldShowAnswer: new FormControl(this.quizOptions.shouldShowAnswer),
        shouldHideRandomProperties: new FormControl(
          this.quizOptions.shouldHideRandomProperties
        ),
      }),
      radical: new FormGroup({
        active: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.RADICAL)
        ),
        meanings: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('meanings')
        ),
      }),
      kanji: new FormGroup({
        active: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.KANJI)
        ),
        meanings: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.KANJI)
            .includes('meanings')
        ),
        onyomi: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.KANJI)
            .includes('onyomi')
        ),
        kunyomi: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.KANJI)
            .includes('kunyomi')
        ),
        nanori: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.KANJI)
            .includes('nanori')
        ),
      }),
      vocabulary: new FormGroup({
        active: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.VOCABULARY)
        ),
        meanings: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.VOCABULARY)
            .includes('meanings')
        ),
        reading: new FormControl(
          this.quizOptions.excludedProperties
            .get(CharacterType.VOCABULARY)
            .includes('reading')
        ),
      }),
    });
  }

  onChangeOptions(): void {
    const quizOptions: QuizOptions = this.extractQuizOptionsFromForm();
    const isAnyTypeSelected = quizOptions.questionTypes.length !== 0;
    if (this.quizOptionsFormGroup.valid && isAnyTypeSelected) {
      this.store.dispatch(QuizActions.changeQuizOptions({ quizOptions }));
    }
  }

  private extractQuizOptionsFromForm(): QuizOptions {
    return {
      numberOfQuestions: this.quizOptionsFormGroup.get([
        'general',
        'numberOfQuestions',
      ]).value,
      minNumberOfProperties: DEFAULT_MIN_NUMBER_OF_PROPERTIES,
      shouldShowAnswer: this.quizOptionsFormGroup.get([
        'general',
        'shouldShowAnswer',
      ]).value,
      shouldHideRandomProperties: this.quizOptionsFormGroup.get([
        'general',
        'shouldHideRandomProperties',
      ]).value,
      excludedProperties: this.getExcludedProperties(),
      questionTypes: this.getSelectedCharacterTypes(),
    };
  }

  private getExcludedProperties(): Map<CharacterType, string[]> {
    return new Map([
      [
        CharacterType.RADICAL,
        [
          ...this.getTypeExcludedProperties('radical'),
          ...DEFAULT_EXCLUDED_PROPERTIES,
        ],
      ],
      [
        CharacterType.KANJI,
        [
          ...this.getTypeExcludedProperties('kanji'),
          ...DEFAULT_EXCLUDED_PROPERTIES,
        ],
      ],
      [
        CharacterType.VOCABULARY,
        [
          ...this.getTypeExcludedProperties('vocabulary'),
          ...DEFAULT_EXCLUDED_PROPERTIES,
        ],
      ],
    ]);
  }

  private getSelectedCharacterTypes = (): CharacterType[] =>
    Object.values(CharacterType)
      .filter((value) => this.isTypeSelected(value.toLowerCase()))
      .map((value) => CharacterType[value.toUpperCase()]);

  private getTypeExcludedProperties(characterType: string): string[] {
    const formGroupValue = this.quizOptionsFormGroup.get(characterType).value;
    return Object.getOwnPropertyNames(formGroupValue).filter(
      (property) => formGroupValue[property] && property !== 'active'
    );
  }

  isTypeSelected = (type: string): boolean =>
    this.quizOptionsFormGroup.get(type).value.active;

  shouldHideRandomProperties(): boolean {
    return this.quizOptionsFormGroup.get([
      'general',
      'shouldHideRandomProperties',
    ]).value;
  }

  toggleOptions(): void {
    const isHidden = this.toggleState === this.HIDDEN_STATE;
    this.toggleState = isHidden ? this.REVEALED_STATE : this.HIDDEN_STATE;
    this.message = isHidden ? this.HIDE_MESSAGE : this.SHOW_MESSAGE;
  }
}
