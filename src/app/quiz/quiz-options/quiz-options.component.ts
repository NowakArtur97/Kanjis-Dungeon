import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
      .subscribe(({ nextQuestion, quizOptions }) => {
        this.quizOptions = quizOptions;
        this.initForm();
      });
  }

  ngOnDestroy(): void {
    this.quizOptionsSubscription$?.unsubscribe();
  }

  initForm() {
    this.quizOptionsFormGroup = new FormGroup({
      radical: new FormGroup({
        radical: new FormControl(),
        meanings: new FormControl(),
      }),
      kanji: new FormGroup({
        kanji: new FormControl(),
        meanings: new FormControl(),
        onyomi: new FormControl(),
        kunyomi: new FormControl(),
        nanori: new FormControl(),
      }),
      vocabulary: new FormGroup({
        vocabulary: new FormControl(),
        meanings: new FormControl(),
      }),
    });
  }

  onChangeOptions(): void {}
}
