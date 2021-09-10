import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import * as EnemyActions from '../enemy/store/enemy.actions';
import GameTurn from '../enums/game-turn.enum';
import * as LevelActions from '../level/store/level.actions';
import * as PlayerActions from '../player/store/player.actions';
import * as GameActions from '../store/game.actions';

@Injectable()
export default class GameEffects {
  constructor(private actions$: Actions, private store: Store<AppStoreState>) {}

  chooseLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LevelActions.chooseLevel),
      mergeMap(() => [GameActions.resetGame(), PlayerActions.startPlayerTurn()])
    )
  );

  changeTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.changeTurn),
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

  completeLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.completeLevel),
      map(() => QuizActions.showSummary())
    )
  );
}
