import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import CharacterType from '../../character/enums/character-type.enum';
import CharacterService from '../../character/services/character.service';
import GameResult from '../../enums/game-result.enum';
import * as LevelActions from '../../level/store/level.actions';
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
      ofType(LevelActions.chooseLevel),
      switchMap(({ level }) =>
        of(
          this.enemyService.chooseRandomEnemiesActions(
            this.enemyService.chooseEnemies(level.enemies)
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
        of(this.enemyService.useCardOnEnemy(chosenCard, enemy, enemies))
      ),
      map((enemies) => EnemyActions.setEnemies({ enemies }))
    )
  );

  applyStatusesOnEnemies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.startPlayerTurn),
      withLatestFrom(this.store.select((state) => state.enemy.enemies)),
      map(([, enemies]) =>
        EnemyActions.setEnemies({
          enemies: this.enemyService.applyStatusesOnEnemies(enemies),
        })
      )
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
        if (player.stats.currentHealth <= 0) {
          return GameActions.completeLevel({ result: GameResult.LOSE });
        }
        const enemyForAction = this.enemyService.chooseFirstEnemyForAction(
          enemies
        );
        if (enemyForAction === undefined) {
          return EnemyActions.endEnemyTurn();
        } else {
          const playedAnimation = {
            character: enemyForAction,
            animationName: enemyForAction.currentAction.action,
            animationPosition: player.position,
          };
          return GameActions.startCharacterAnimation({
            playedAnimation,
          });
        }
      })
    )
  );

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
        const enemyForAction = this.enemyService.chooseEnemyForAction(
          enemies,
          character
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
            PlayerActions.setPlayer({ player: playerAfterAction }),
          ];
        } else {
          return [
            EnemyActions.setEnemy({
              enemy: enemyAfterAction,
            }),
            EnemyActions.endEnemyTurn(),
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
