import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../../store/game.actions';
import DeckService from '../services/deck.service';
import * as DeckActions from '../store/deck.actions';

@Injectable()
export default class DeckEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppStoreState>,
    private deckService: DeckService
  ) {}

  setAllCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.chooseLevel),
      switchMap(({ level }) => of(this.deckService.getCards(level))),
      map((allCards) => DeckActions.setAllCards({ allCards }))
    )
  );

  getCardsToHand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeckActions.setAllCards),
      withLatestFrom(this.store.select((state) => state.deck?.numberOfCards)),
      switchMap(([{ allCards }, numberOfCards]) =>
        of(this.deckService.getHand(allCards, numberOfCards))
      ),
      map((hand) => DeckActions.getCardsToHand({ hand }))
    )
  );
}
