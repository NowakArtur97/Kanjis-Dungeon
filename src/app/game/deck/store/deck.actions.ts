import { createAction, props } from '@ngrx/store';

import GameCard from '../models/game-card.model';

export const setAllCards = createAction(
  '[Deck] Set All Cards',
  props<{ allCards: GameCard[] }>()
);

export const getCardsToHand = createAction(
  '[Deck] Get Cards to Hand From Deck',
  props<{ hand: GameCard[] }>()
);

export const chooseCard = createAction(
  '[Deck] Choose Card',
  props<{ chosenCard: GameCard }>()
);

export const useCard = createAction(
  '[Deck] Use Card',
  props<{ cost: number }>()
);

export const changeEnergy = createAction(
  '[Deck] Change Energy',
  props<{ energy: number }>()
);

export const restoreEnergy = createAction('[Deck] Restore Energy');
