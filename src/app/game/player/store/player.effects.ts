import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as PlayerActions from '../store/player.actions';

@Injectable()
export default class PlayerEffects {
  constructor(private actions$: Actions, private store: Store<AppStoreState>) {}

  useCardOnPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.useCardOnPlayer),
      withLatestFrom(
        this.store.select((state) => state.deck?.chosenCard),
        this.store.select((state) => state.player?.player)
      ),
      switchMap(([action, chosenCard, player]) => {
        const updatedPlayer = JSON.parse(JSON.stringify(player));
        chosenCard.apply(updatedPlayer);
        return of(updatedPlayer);
      }),
      map((player) => PlayerActions.setPlayer({ player }))
    )
  );
}
