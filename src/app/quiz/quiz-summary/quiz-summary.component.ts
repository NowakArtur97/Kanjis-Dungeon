import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import GameResult from 'src/app/game/enums/game-result.enum';
import Radical from 'src/app/japanese/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.css'],
  animations: [
    trigger('blink', [
      transition(
        'hidden => revealed',
        animate(
          2000,
          keyframes([
            style({
              transform: 'scale(0) translate(-50%, -50%)',
              offset: 0,
            }),
            style({
              transform: 'scale(1) translate(-50%, -50%)',
              offset: 0.3,
            }),
            style({ transform: 'scale(0) translate(-50%, -50%)', offset: 1 }),
          ])
        )
      ),
    ]),
    trigger('show', [
      state('hidden', style({ transform: 'translateY(-100%)' })),
      state('revealed', style({ transform: 'translateY(0)' })),
      transition('hidden => revealed', animate('2000ms 1800ms')),
    ]),
  ],
})
export class QuizSummaryComponent implements OnInit, OnDestroy {
  private mistakesSubscription$: Subscription;
  private resultSubscription$: Subscription;
  mistakes: Radical[];
  isVisible: boolean;
  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  messageState = this.HIDDEN_STATE;
  mistakesState = this.HIDDEN_STATE;
  message: string;
  messageColor: string;

  private messages = {
    victory: 'Victory',
    defeat: 'Defeat',
    default: 'Congratulations!',
  };
  private colors = {
    victory: '#24e043',
    defeat: '#e02424',
    default: '#e07224',
  };

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.mistakesSubscription$ = this.store
      .select('quiz')
      .subscribe(({ mistakes, shouldShowSummary }) => {
        this.isVisible = shouldShowSummary;
        this.mistakes = mistakes;
        setTimeout(() => {
          this.messageState = this.isVisible
            ? this.REVEALED_STATE
            : this.HIDDEN_STATE;
          this.mistakesState = this.isVisible
            ? this.REVEALED_STATE
            : this.HIDDEN_STATE;
        }, 1000);
      });

    this.resultSubscription$ = this.store
      .select('game')
      .subscribe(({ result }) => {
        const property =
          result != null
            ? result === GameResult.WIN
              ? 'victory'
              : 'defeat'
            : 'default';
        console.log(property);
        this.message = this.messages[property];
        this.messageColor = this.colors[property];
      });
  }

  ngOnDestroy(): void {
    this.mistakesSubscription$?.unsubscribe();
    this.resultSubscription$?.unsubscribe();
  }
}
