import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CharacterType from 'src/app/common/enums/character-type.enum';
import AppStoreState from 'src/app/store/app.state';

import QuizOptions from '../models/quiz-options.model';
import { DEFAULT_EXCLUDED_PROPERTIES } from '../store/quiz.reducer';

@Component({
  selector: 'app-quiz-options',
  templateUrl: './quiz-options.component.html',
  styleUrls: ['./quiz-options.component.css'],
})
export class QuizOptionsComponent implements OnInit, OnDestroy {
  private quizOptionsSubscription$: Subscription;
  quizOptionsFormGroup: FormGroup;
  quizOptions: QuizOptions;

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
        numberOfQuestions: new FormControl(this.quizOptions.numberOfQuestions),
      }),
      radical: new FormGroup({
        active: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.RADICAL)
        ),
        meanings: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('meanings')
        ),
      }),
      kanji: new FormGroup({
        active: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.KANJI)
        ),
        meanings: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('meanings')
        ),
        onyomi: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('onyomi')
        ),
        kunyomi: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('kunyomi')
        ),
        nanori: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('nanori')
        ),
      }),
      vocabulary: new FormGroup({
        active: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.VOCABULARY)
        ),
        meanings: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('meanings')
        ),
      }),
    });
  }

  onChangeOptions(): void {
    const quizOptions: QuizOptions = {
      numberOfQuestions: this.quizOptionsFormGroup.get([
        'general',
        'numberOfQuestions',
      ]).value,
      excludedProperties: this.getExcludedProperties(),
      questionTypes: this.getSelectedCharacterTypes(),
    };
    console.log(quizOptions);
    // TODO: Dispatch Action to change Quiz Options
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
      (property) => !formGroupValue[property] && property !== 'active'
    );
  }

  isTypeSelected = (type: string): boolean =>
    this.quizOptionsFormGroup.get(type).value.active;
}
