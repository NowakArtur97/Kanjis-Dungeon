import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../../store/game.actions';
import EnemyService from '../services/enemy.service';
import * as EnemyActions from './enemy.actions';

@Injectable()
export default class EnemyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private enemyService: EnemyService
  ) {}

  chooseEnemies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.chooseLevel),
      // TODO: EnemyEffects: Get all possible enemies
      // withLatestFrom(this.store.select((state) => state.enemies?.allEnemies)),
      switchMap(({ level }) => of(this.enemyService.chooseEnemies(level))),
      map((enemies) => EnemyActions.setEnemies({ enemies }))
    )
  );

  useCardOnEnemy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnemyActions.useCardOnEnemy),
      withLatestFrom(
        this.store.select((state) => state.deck?.chosenCard),
        this.store.select((state) => state.enemy?.enemies)
      ),
      switchMap(([{ enemy }, chosenCard, enemies]) =>
        of(this.enemyService.updateEnemies(chosenCard, enemy, enemies))
      ),
      map((enemies) => EnemyActions.setEnemies({ enemies }))
    )
  );

  startEnemyTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnemyActions.startEnemyTurn),
      withLatestFrom(this.store.select((state) => state.enemy?.enemies)),
      switchMap(([action, enemies]) =>
        of(this.enemyService.chooseRandomEnemiesActions(enemies))
      ),
      mergeMap((enemies) => [
        EnemyActions.setEnemies({ enemies }),
        GameActions.changeTurn(),
      ])
    )
  );
}
