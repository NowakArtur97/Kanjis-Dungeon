import { Component, OnDestroy, OnInit } from '@angular/core';
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
})
export class QuizOptionsComponent implements OnInit, OnDestroy {
  private quizOptionsSubscription$: Subscription;
  private quizOptions: QuizOptions;
  quizOptionsFormGroup: FormGroup;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.quizOptionsSubscription$ = this.store
      .select('quiz')
      .subscribe(({ quizOptions }) => {
        this.quizOptions = quizOptions;
        this.initForm();
      });
  }

  ngOnDestroy(): void {
    this.quizOptionsSubscription$?.unsubscribe();
  }

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
}
