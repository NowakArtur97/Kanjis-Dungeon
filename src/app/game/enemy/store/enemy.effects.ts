import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as GameActions from '../../store/game.actions';
import EnemyService from '../services/enemy.service';
import * as EnemyActions from '../store/enemy.actions';

@Injectable()
export default class EnemyEffects {
  constructor(private actions$: Actions, private enemyService: EnemyService) {}

  chooseEnemies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.chooseLevel),
      // TODO: EnemyEffects: Get all possible enemies
      // withLatestFrom(this.store.select((state) => state.enemies?.allEnemies)),
      switchMap(({ level }) => of(this.enemyService.chooseEnemies(level))),
      map((enemies) => EnemyActions.chooseEnemies({ enemies }))
    )
  );
}
