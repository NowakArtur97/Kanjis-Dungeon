import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import CharacterType from '../../character/enums/character-type.enum';
import CharacterService from '../../character/services/character.service';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import EnemyService from '../services/enemy.service';
import * as EnemyActions from './enemy.actions';

// TODO: REMOVE
// import * as PlayerActions from '../../player/store/player.actions';
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

  // TODO: TEST
  startEnemyTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnemyActions.startEnemyTurn),
      withLatestFrom(
        this.store.select((state) => state.enemy.enemies),
        this.store.select((state) => state.player.player)
      ),
      map(([, enemies, player]) => {
        const enemyForAction = enemies[0];
        const playedAnimation = {
          character: enemyForAction,
          animationName: enemyForAction.currentAction.action,
          animationPosition: player.position,
        };
        return GameActions.startCharacterAnimation({
          playedAnimation,
        });
      })
    )
  );

  // TODO: TEST
  finishCharacterAnimation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.finishCharacterAnimation),
      filter((action) => action.character.stats.type === CharacterType.ENEMY),
      withLatestFrom(
        this.store.select((state) => state.enemy.enemies),
        this.store.select((state) => state.player.player)
      ),
      mergeMap(([{ character }, enemies, player]) => {
        const {
          enemy: enemyAfterAction,
          player: playerAfterAction,
        } = this.enemyService.performAction(character, player);
        const enemyForAction = enemies.find(
          (enemy) => enemy.currentAction !== null && enemy.id !== character.id
        );
        if (enemyForAction) {
          const playedAnimation = {
            character: enemyForAction,
            animationName: enemyForAction.currentAction.action,
            animationPosition: player.position,
          };
          return [
            EnemyActions.setEnemy({
              enemy: enemyAfterAction,
            }),
            GameActions.startCharacterAnimation({
              playedAnimation,
            }),
            EnemyActions.setEnemy({ enemy: enemyAfterAction }),
            PlayerActions.setPlayer({ player: playerAfterAction }),
          ];
        } else {
          return [
            EnemyActions.setEnemy({
              enemy: enemyAfterAction,
            }),
            EnemyActions.endEnemyTurn(),
            EnemyActions.setEnemy({ enemy: enemyAfterAction }),
            PlayerActions.setPlayer({ player: playerAfterAction }),
          ];
        }
      })
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
