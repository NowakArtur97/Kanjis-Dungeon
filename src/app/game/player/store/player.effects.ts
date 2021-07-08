import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import CharacterType from '../../character/enums/character-type.enum';
import CharacterService from '../../character/services/character.service';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import GameTurn from '../../enums/game-turn.enum';
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
      ofType(GameActions.chooseLevel),
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
      map((player) => PlayerActions.setPlayer({ player }))
    )
  );

  useCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.useCardOnPlayer, EnemyActions.useCardOnEnemy),
      withLatestFrom(
        this.store.select((state) => state.deck.chosenCard),
        this.store.select((state) => state.player.player),
        this.store.select((state) => state.game.animationPosition)
      ),
      map(([, chosenCard, player, animationPosition]) =>
        GameActions.startCharacterAnimation({
          playedAnimation: {
            character: player,
            animationName: chosenCard.animationName,
            animationPosition,
          },
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
