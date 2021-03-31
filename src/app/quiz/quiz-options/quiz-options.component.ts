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

  initForm(): void {
    this.quizOptionsFormGroup = new FormGroup({
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
    const excludedProperties = new Map([
      [
        CharacterType.RADICAL,
        [
          ...this.getExcludedProperties('radical'),
          ...DEFAULT_EXCLUDED_PROPERTIES,
        ],
      ],
      [
        CharacterType.KANJI,
        [
          ...this.getExcludedProperties('kanji'),
          ...DEFAULT_EXCLUDED_PROPERTIES,
        ],
      ],
      [
        CharacterType.VOCABULARY,
        [
          ...this.getExcludedProperties('vocabulary'),
          ...DEFAULT_EXCLUDED_PROPERTIES,
        ],
      ],
    ]);
    const questionTypes = Object.values(CharacterType)
      .filter((value) => this.isTypeActive(value.toLowerCase()))
      .map((value) => CharacterType[value.toUpperCase()]);
    console.log(questionTypes);
    console.log(excludedProperties);
    // TODO: Dispatch Action to change Quiz Options
  }

  private getExcludedProperties(characterType: string): string[] {
    const formGroupValue = this.quizOptionsFormGroup.get(characterType).value;
    return Object.getOwnPropertyNames(formGroupValue).filter(
      (property) => !formGroupValue[property] && property !== 'active'
    );
  }

  isTypeActive(type: string): boolean {
    return this.quizOptionsFormGroup.get(type).value.active;
  }
}
