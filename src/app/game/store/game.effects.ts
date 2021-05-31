import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import * as EnemyActions from '../enemy/store/enemy.actions';
import GameTurn from '../enums/game-turn.enum';
import * as PlayerActions from '../player/store/player.actions';
import GameService from '../services/game.service';
import * as GameActions from '../store/game.actions';

@Injectable()
export default class GameEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private gameService: GameService
  ) {}

  chooseLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.chooseLevel, GameActions.changeTurn),
      withLatestFrom(this.store.select((state) => state.game?.turn)),
      map(([, turn]) => {
        if (turn === GameTurn.ENEMY_TURN) {
          return EnemyActions.startEnemyTurn();
        } else {
          return PlayerActions.startPlayerTurn();
        }
      })
    )
  );

  // TODO: GameEffects: Select options only at the start of level
  startPlayerTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.startPlayerTurn),
      withLatestFrom(this.store.select((state) => state.game?.level)),
      switchMap(([, level]) =>
        of(this.gameService.chooseQuizOptionsForLevel(level))
      ),
      map((quizOptions) => QuizActions.changeQuizOptions({ quizOptions }))
    )
  );

  changePhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.addAnswer, EnemyActions.endEnemyTurn),
      withLatestFrom(
        this.store.select((state) => state.quiz?.questions.length)
      ),
      map(([, numberOfQuestions]) => {
        if (numberOfQuestions === 0) {
          return GameActions.changePhase();
        }
      }),
      filter((action) => !!action)
    )
  );
}
