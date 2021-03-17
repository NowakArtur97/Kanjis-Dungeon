import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Kanji from 'src/app/kanji/models/kanji.model';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';
import Word from 'src/app/vocabulary/models/word.model';

import * as QuizActions from '../store/quiz.actions';
import { QuizStoreState } from '../store/quiz.reducer';

@Injectable({ providedIn: 'root' })
export default class QuizService {
  private quizStoreSubscription$ = new Subscription();
  private radicals: Radical[] = [];
  private kanji: Kanji[] = [];
  private vocabulary: Word[] = [];
  private quizStore: QuizStoreState;
  private questions: Radical[] = [];

  constructor(private store: Store<AppStoreState>) {
    this.quizStoreSubscription$.add(
      this.store
        .select('quiz')
        .subscribe((quizStore) => (this.quizStore = quizStore))
    );

    this.quizStoreSubscription$.add(
      this.store
        .select('radical')
        .subscribe(({ radicals }) => (this.radicals = radicals))
    );

    this.quizStoreSubscription$.add(
      this.store.select('kanji').subscribe(({ kanji }) => (this.kanji = kanji))
    );

    this.quizStoreSubscription$.add(
      this.store
        .select('vocabulary')
        .subscribe(({ vocabulary }) => (this.vocabulary = vocabulary))
    );
  }

  prepareQuestions(): void {
    this.getRandomQuestions([
      ...this.radicals,
      ...this.kanji,
      ...this.vocabulary,
    ]);

    this.store.dispatch(
      QuizActions.setQuestions({ questions: this.questions })
    );
  }

  private getRandomQuestions(allQuestions: Radical[]): void {}
}
