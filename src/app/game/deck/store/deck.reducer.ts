import { Action, createReducer, on } from '@ngrx/store';

import GameCard from '../models/game-card.model';
import * as DeckActions from './deck.actions';

export interface DeckStoreState {
  allCards: GameCard[];
  hand: GameCard[];
  chosenCard: GameCard;
  numberOfCards: number;
}

const initialState: DeckStoreState = {
  allCards: [],
  hand: [],
  chosenCard: null,
  numberOfCards: 6,
};

const _deckReducer = createReducer(
  initialState,

  on(DeckActions.setAllCards, (state, { allCards }) => ({
    ...state,
    allCards,
  })),

  on(DeckActions.getCardsToHand, (state, { hand }) => ({
    ...state,
    hand,
  })),

  on(DeckActions.chooseCard, (state, { chosenCard }) => ({
    ...state,
    chosenCard,
  }))
);

export function deckReducer(
  state: DeckStoreState,
  action: Action
): DeckStoreState {
  return _deckReducer(state, action);
}
