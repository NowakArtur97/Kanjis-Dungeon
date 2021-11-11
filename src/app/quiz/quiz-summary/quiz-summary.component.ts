import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import GameResult from 'src/app/game/enums/game-result.enum';
import Level from 'src/app/game/level/models/level.model';
import Radical from 'src/app/japanese/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

import * as LevelActions from '../../game/level/store/level.actions';
import * as GameActions from '../../game/store/game.actions';
import * as QuizActions from '../../quiz/store/quiz.actions';

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
    trigger('appear', [
      state('hidden', style({ opacity: 0 })),
      state('revealed', style({ opacity: 1 })),
      transition('hidden => revealed', animate('2000ms 1800ms')),
    ]),
  ],
})
export class QuizSummaryComponent implements OnInit, OnDestroy {
  private mistakesSubscription$: Subscription;
  private resultSubscription$: Subscription;
  private levelSubscription$: Subscription;
  private mistakes: Radical[];
  private newPreferredQuestions: Radical[];
  isVisible: boolean;
  shouldProposeNewPreferredQuestions: boolean;
  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  messageState = this.HIDDEN_STATE;
  mistakesState = this.HIDDEN_STATE;
  buttonsState = this.HIDDEN_STATE;
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
  private level: Level;

  constructor(private store: Store<AppStoreState>, private router: Router) {}

  ngOnInit(): void {
    this.mistakesSubscription$ = this.store
      .select('quiz')
      .subscribe(({ mistakes, shouldShowSummary, preferredQuestions }) => {
        this.isVisible = shouldShowSummary;
        this.mistakes = mistakes;
        this.newPreferredQuestions = this.mistakes.filter(
          (mistake) =>
            !preferredQuestions.some(
              (preferredQuestion) =>
                preferredQuestion.characters === mistake.characters &&
                preferredQuestion.type === mistake.type
            )
        );
        this.shouldProposeNewPreferredQuestions =
          this.newPreferredQuestions.length > 0;
        setTimeout(() => {
          const animationState = this.isVisible
            ? this.REVEALED_STATE
            : this.HIDDEN_STATE;
          this.messageState = this.mistakesState = this.buttonsState = animationState;
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
        this.message = this.messages[property];
        this.messageColor = this.colors[property];
      });

    this.levelSubscription$ = this.store
      .select('level')
      .subscribe(({ level }) => (this.level = level));
  }

  ngOnDestroy(): void {
    this.mistakesSubscription$?.unsubscribe();
    this.resultSubscription$?.unsubscribe();
    this.levelSubscription$?.unsubscribe();
  }

  onTryAgainQuiz(): void {
    this.store.dispatch(QuizActions.repeatQuiz());
    if (this.level) {
      this.store.dispatch(GameActions.resetGame());
      this.store.dispatch(LevelActions.chooseLevel({ level: this.level }));
      this.router.navigate(['./game']);
    }
  }

  onCloseSummary(): void {
    this.store.dispatch(QuizActions.resetQuiz());
    if (this.level) {
      this.store.dispatch(GameActions.resetGame());
      this.router.navigate(['./levels']);
    }
  }

  onAddMistakesToPreferred = (): void =>
    this.store.dispatch(
      QuizActions.addPreferredQuestions({
        preferredQuestions: this.newPreferredQuestions,
      })
    );
}
