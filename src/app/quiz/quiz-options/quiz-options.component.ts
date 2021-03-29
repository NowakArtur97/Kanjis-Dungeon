import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CharacterType from 'src/app/common/enums/character-type.enum';
import AppStoreState from 'src/app/store/app.state';

import QuizOptions from '../models/quiz-options.model';

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
        radical: new FormControl(
          this.quizOptions.questionTypes.includes(CharacterType.RADICAL)
        ),
        meanings: new FormControl(
          !this.quizOptions.excludedProperties
            .get(CharacterType.RADICAL)
            .includes('meanings')
        ),
      }),
      kanji: new FormGroup({
        kanji: new FormControl(
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
        vocabulary: new FormControl(
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

  onChangeOptions(): void {}
}
