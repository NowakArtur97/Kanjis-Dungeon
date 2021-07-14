import { Action, createReducer, on } from '@ngrx/store';

import GameCard from '../models/game-card.model';
import * as DeckActions from './deck.actions';

export interface DeckStoreState {
  allCards: GameCard[];
  hand: GameCard[];
  chosenCard: GameCard;
  numberOfCards: number;

  remainingEnergy: number;
  defaultEnergy: number;
  maxEnergy: number;
}

const initialState: DeckStoreState = {
  allCards: [],
  hand: [],
  chosenCard: null,
  numberOfCards: 6,

  remainingEnergy: 2,
  defaultEnergy: 2,
  maxEnergy: 2,
};
export { initialState };

const _deckReducer = createReducer(
  initialState,

  on(DeckActions.setAllCards, (state, { allCards }) => ({
    ...state,
    allCards,
  })),

  // TODO: TEST
  on(DeckActions.getCardsToHand, (state, { hand }) => ({
    ...state,
    hand,
    remainingEnergy:
      state.remainingEnergy >= 0 ? state.remainingEnergy : state.defaultEnergy,
    maxEnergy: state.maxEnergy >= 0 ? state.maxEnergy : state.defaultEnergy,
  })),

  on(DeckActions.chooseCard, (state, { chosenCard }) => ({
    ...state,
    chosenCard,
  })),

  on(DeckActions.useCard, (state, { cost }) => ({
    ...state,
    hand: state.hand.filter((card) => card.id !== state.chosenCard.id),
    chosenCard: null,
    remainingEnergy: state.remainingEnergy - cost,
  })),

  // TODO: TEST
  on(DeckActions.changeEnergy, (state, { energy }) => ({
    ...state,
    remainingEnergy:
      state.remainingEnergy + energy > 0 ? state.remainingEnergy + energy : 0,
    maxEnergy: state.maxEnergy + energy > 0 ? state.maxEnergy + energy : 0,
  })),

  on(DeckActions.resetEnergy, (state) => ({
    ...state,
    remainingEnergy: state.defaultEnergy,
    maxEnergy: state.defaultEnergy,
  }))
);

export function deckReducer(
  state: DeckStoreState,
  action: Action
): DeckStoreState {
  return _deckReducer(state, action);
}
