import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Radical from 'src/app/japanese/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.css'],
  animations: [
    trigger('show', [
      state('hidden', style({ transform: 'scale(0) translate(-50%, -50%)' })),
      state('revealed', style({ transform: 'scale(1) translate(-50%, -50%)' })),
      transition('hidden => revealed', animate(2000)),
    ]),
  ],
})
export class QuizSummaryComponent implements OnInit, OnDestroy {
  private mistakesSubscription$: Subscription;
  mistakes: Radical[];
  shouldShowSummary: boolean;
  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  state = this.HIDDEN_STATE;
  message: string;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    console.log(this.state);
    this.mistakesSubscription$ = this.store
      .select('quiz')
      .subscribe(({ mistakes, shouldShowSummary }) => {
        this.shouldShowSummary = shouldShowSummary;
        this.mistakes = mistakes;
        setTimeout(
          () =>
            (this.state = this.shouldShowSummary
              ? this.REVEALED_STATE
              : this.HIDDEN_STATE),
          1000
        );
        this.message = 'message';
      });
  }

  ngOnDestroy = (): void => this.mistakesSubscription$?.unsubscribe();
}
