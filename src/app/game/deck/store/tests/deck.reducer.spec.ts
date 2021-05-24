import { attackCard, defenceCard, powerCard } from '../../deck.data';
import GameCard from '../../models/game-card.model';
import * as DeckActions from '../deck.actions';
import { deckReducer, DeckStoreState } from '../deck.reducer';

const allCards: GameCard[] = [attackCard, defenceCard, powerCard];
const hand = [attackCard, defenceCard];
const initialState: DeckStoreState = {
  allCards: [],
  hand: [],
  chosenCard: null,
  numberOfCards: 6,

  remainingEnergy: 2,
  maxEnergy: 4,
};
const stateWithHand: DeckStoreState = {
  ...initialState,
  allCards,
  hand,
};
const stateWithCards: DeckStoreState = {
  ...initialState,
  allCards,
};
const stateWithChosenCards: DeckStoreState = {
  ...stateWithHand,
  chosenCard: attackCard,
};

describe('deckReducer', () => {
  describe('DeckActions.setAllCards', () => {
    it('should set cards', () => {
      const action = DeckActions.setAllCards({ allCards });
      const actualState = deckReducer(initialState, action);
      const expectedState = { ...stateWithCards };

      expect(actualState).toEqual(expectedState);
      expect(actualState.allCards).toEqual(allCards);
      expect(actualState.allCards.length).toBe(allCards.length);
    });
  });

  describe('DeckActions.getCardsToHand', () => {
    it('should get cards to hand', () => {
      const action = DeckActions.getCardsToHand({ hand });
      const actualState = deckReducer(stateWithCards, action);
      const expectedState = { ...stateWithHand };

      expect(actualState).toEqual(expectedState);
      expect(actualState.hand).toEqual(hand);
    });
  });

  describe('DeckActions.chooseCard', () => {
    it('should choose card', () => {
      const stateWithChosenCard: DeckStoreState = {
        ...initialState,
        allCards,
        hand,
        chosenCard: attackCard,
      };

      const action = DeckActions.chooseCard({ chosenCard: attackCard });
      const actualState = deckReducer(stateWithHand, action);
      const expectedState = { ...stateWithChosenCard };

      expect(actualState).toEqual(expectedState);
      expect(actualState.chosenCard).toEqual(attackCard);
    });
  });

  describe('DeckActions.useCard', () => {
    it('should decrease deck energy, remove card from hand and set chosen card to null', () => {
      const remainingEnergy = initialState.remainingEnergy - attackCard.cost;
      const stateWithReducedEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [defenceCard],
        remainingEnergy,
        chosenCard: null,
      };

      const action = DeckActions.useCard({ cost: attackCard.cost });
      const actualState = deckReducer(stateWithChosenCards, action);
      const expectedState = { ...stateWithReducedEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toEqual(remainingEnergy);
    });
  });

  describe('DeckActions.restoreEnergy', () => {
    it('should set remaining energy to max', () => {
      const stateWithReducedEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],

        remainingEnergy: 0,
      };
      const stateWithMaxEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],
        remainingEnergy: initialState.maxEnergy,
        chosenCard: null,
      };

      const action = DeckActions.restoreEnergy();
      const actualState = deckReducer(stateWithReducedEnergy, action);
      const expectedState = { ...stateWithMaxEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toEqual(expectedState.maxEnergy);
    });
  });
});
