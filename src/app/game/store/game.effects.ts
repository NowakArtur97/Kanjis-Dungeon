import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as EnemyActions from '../enemy/store/enemy.actions';
import GameTurn from '../enums/game-turn.enum';
import * as PlayerActions from '../player/store/player.actions';
import * as GameActions from '../store/game.actions';

@Injectable()
export default class GameEffects {
  constructor(private actions$: Actions, private store: Store<AppStoreState>) {}

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
}
