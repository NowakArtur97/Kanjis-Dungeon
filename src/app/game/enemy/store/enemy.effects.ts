import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import CharacterService from '../../character/services/character.service';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import EnemyService from '../services/enemy.service';
import * as EnemyActions from './enemy.actions';

@Injectable()
export default class EnemyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private enemyService: EnemyService,
    private characterService: CharacterService
  ) {}

  chooseLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.chooseLevel),
      withLatestFrom(this.store.select((state) => state.enemy.allEnemies)),
      switchMap(([{ level }, allEnemies]) =>
        of(
          this.enemyService.chooseRandomEnemiesActions(
            this.enemyService.chooseEnemies(level, allEnemies)
          )
        )
      ),
      switchMap((enemies) =>
        of(
          enemies.map((enemy) =>
            this.characterService.setRandomTopOffset(enemy)
          )
        )
      ),
      map((enemies) => EnemyActions.setEnemies({ enemies }))
    )
  );

  useCardOnEnemy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnemyActions.useCardOnEnemy),
      withLatestFrom(
        this.store.select((state) => state.deck.chosenCard),
        this.store.select((state) => state.enemy.enemies)
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
      withLatestFrom(
        this.store.select((state) => state.enemy.enemies),
        this.store.select((state) => state.player.player)
      ),
      switchMap(([, enemies, player]) =>
        of(this.enemyService.performActions(enemies, player))
      ),
      mergeMap(({ enemies, player }) => [
        EnemyActions.setEnemies({ enemies }),
        EnemyActions.endEnemyTurn(),
        PlayerActions.setPlayer({ player }),
      ])
    )
  );

  endEnemyTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnemyActions.endEnemyTurn),
      withLatestFrom(this.store.select((state) => state.enemy.enemies)),
      switchMap(([, enemies]) =>
        of(this.enemyService.chooseRandomEnemiesActions(enemies))
      ),
      mergeMap((enemies) => [
        EnemyActions.setEnemies({ enemies }),
        GameActions.changeTurn(),
      ])
    )
  );
}
