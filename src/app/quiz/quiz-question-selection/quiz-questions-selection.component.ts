import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Radical from 'src/app/japanese/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-questions-selection',
  templateUrl: './quiz-questions-selection.component.html',
  styleUrls: ['./quiz-questions-selection.component.css'],
})
export class QuizQuestionsSelectionComponent implements OnInit, OnDestroy {
  questions: Radical[];
  private questionSubscription$: Subscription;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.questionSubscription$ = this.store
      .select('quiz')
      .subscribe(({ questions }) => (this.questions = questions));
  }

  ngOnDestroy(): void {
    this.questionSubscription$?.unsubscribe();
  }
}
