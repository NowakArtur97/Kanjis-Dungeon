import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import CharacterService from '../../character/services/character.service';
import * as EnemiesActions from '../../enemy/store/enemy.actions';
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
      ofType(PlayerActions.useCardOnPlayer, EnemiesActions.useCardOnEnemy),
      withLatestFrom(
        this.store.select((state) => state.deck.chosenCard),
        this.store.select((state) => state.player.player)
      ),
      map(([, chosenCard, player]) =>
        GameActions.startCharacterAnimation({
          playedAnimation: {
            character: player,
            animationName: chosenCard.animationName,
          },
        })
      )
    )
  );
}
