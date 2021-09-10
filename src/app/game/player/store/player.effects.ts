import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../../quiz/store/quiz.actions';
import CharacterType from '../../character/enums/character-type.enum';
import CharacterService from '../../character/services/character.service';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import GameResult from '../../enums/game-result.enum';
import GameTurn from '../../enums/game-turn.enum';
import * as LevelActions from '../../level/store/level.actions';
import * as GameActions from '../../store/game.actions';
import PlayerService from '../services/player.service';
import * as PlayerActions from '../store/player.actions';

@Injectable()
export default class PlayerEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private playerService: PlayerService,
    private characterService: CharacterService
  ) {}

  chooseLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LevelActions.chooseLevel),
      withLatestFrom(this.store.select((state) => state.player.player)),
      switchMap(([, player]) =>
        of(this.characterService.setRandomTopOffset(player))
      ),
      map((player) => PlayerActions.setPlayer({ player }))
    )
  );

  useCardOnPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.useCardOnPlayer),
      withLatestFrom(
        this.store.select((state) => state.deck.chosenCard),
        this.store.select((state) => state.player.player)
      ),
      switchMap(([, chosenCard, player]) =>
        of(this.playerService.updatePlayer(chosenCard, player))
      ),
      withLatestFrom(this.store.select((state) => state.deck.chosenCard)),
      mergeMap(([player, chosenCard]) => [
        PlayerActions.setPlayer({ player }),
        GameActions.startCharacterAnimation({
          playedAnimation: {
            character: player,
            animationName: chosenCard.animationName,
            animationPosition: player.position,
          },
        }),
      ])
    )
  );

  useCardOnEnemy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnemyActions.useCardOnEnemy),
      withLatestFrom(
        this.store.select((state) => state.deck.chosenCard),
        this.store.select((state) => state.player.player)
      ),
      map(([{ enemy }, { animationName }, player]) =>
        GameActions.startCharacterAnimation({
          playedAnimation: {
            character: player,
            animationName,
            animationPosition: enemy.position,
          },
        })
      )
    )
  );

  // TODO: TEST
  startPlayerTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.startPlayerTurn),
      withLatestFrom(
        this.store.select((state) => state.level.level),
        this.store.select((state) => state.enemy.enemies)
      ),
      map(([, level, enemies]) =>
        enemies.length === 0
          ? GameActions.completeLevel({ result: GameResult.WIN })
          : QuizActions.changeQuizOptions({
              quizOptions: level.quizOptions,
            })
      )
    )
  );

  endPlayerTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.finishCharacterAnimation),
      filter((action) => action.character.stats.type === CharacterType.PLAYER),
      withLatestFrom(
        this.store.select((state) => state.deck),
        this.store.select((state) => state.game.turn)
      ),
      map(([, { remainingEnergy, hand }, turn]) => {
        // TODO: End turn clicking on button/Potions for regenerating energy
        const hasEnergyToUseAnyCard = hand?.every(
          (card) => card.cost > remainingEnergy
        );
        const hasNoRemainingEnergy = remainingEnergy === 0;
        const isStillPlayerTurn = turn === GameTurn.PLAYER_TURN;
        if (
          (hasNoRemainingEnergy || hasEnergyToUseAnyCard) &&
          isStillPlayerTurn
        ) {
          return GameActions.changeTurn();
        }
      }),
      filter((action) => !!action)
    )
  );
}
