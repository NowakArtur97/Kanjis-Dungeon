import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Radical from 'src/app/japanese/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.css'],
})
export class QuizSummaryComponent implements OnInit, OnDestroy {
  private mistakesSubscription$: Subscription;
  mistakes: Radical[];
  shouldShowSummary: boolean;

  constructor(private store: Store<AppStoreState>) {}

  // TODO: TEST
  ngOnInit(): void {
    this.mistakesSubscription$ = this.store
      .select('quiz')
      .subscribe(({ mistakes, questions }) => {
        this.shouldShowSummary = questions.length === 0;
        this.mistakes = mistakes;
      });
  }

  ngOnDestroy = (): void => this.mistakesSubscription$?.unsubscribe();
}
