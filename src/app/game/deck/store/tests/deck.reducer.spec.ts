import { defenceCard, phoenixSummoningCard, powerCard } from '../../deck.data';
import GameCard from '../../models/game-card.model';
import * as DeckActions from '../deck.actions';
import { deckReducer, DeckStoreState, initialState } from '../deck.reducer';

const allCards: GameCard[] = [phoenixSummoningCard, defenceCard, powerCard];
const hand = [phoenixSummoningCard, defenceCard];

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
  chosenCard: phoenixSummoningCard,
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
        chosenCard: phoenixSummoningCard,
      };

      const action = DeckActions.chooseCard({
        chosenCard: phoenixSummoningCard,
      });
      const actualState = deckReducer(stateWithHand, action);
      const expectedState = { ...stateWithChosenCard };

      expect(actualState).toEqual(expectedState);
      expect(actualState.chosenCard).toEqual(phoenixSummoningCard);
    });
  });

  describe('DeckActions.useCard', () => {
    it('should decrease deck energy, remove card from hand and set chosen card to null', () => {
      const remainingEnergy =
        initialState.remainingEnergy - phoenixSummoningCard.cost;
      const stateWithReducedEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [defenceCard],
        remainingEnergy,
        chosenCard: null,
      };

      const action = DeckActions.useCard({ cost: phoenixSummoningCard.cost });
      const actualState = deckReducer(stateWithChosenCards, action);
      const expectedState = { ...stateWithReducedEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toBe(remainingEnergy);
    });
  });

  describe('DeckActions.resetEnergy', () => {
    it('should set remaining and max energy to default', () => {
      const stateWithReducedEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],

        remainingEnergy: 0,
        maxEnergy: 0,
      };
      const stateWithMaxEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],
        remainingEnergy: initialState.defaultEnergy,
        maxEnergy: initialState.defaultEnergy,
        chosenCard: null,
      };

      const action = DeckActions.resetEnergy();
      const actualState = deckReducer(stateWithReducedEnergy, action);
      const expectedState = { ...stateWithMaxEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toBe(expectedState.defaultEnergy);
      expect(actualState.maxEnergy).toBe(expectedState.defaultEnergy);
    });
  });

  describe('DeckActions.changeEnergy', () => {
    it('when increase in energy should increase remaining and max energy', () => {
      const stateWithEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],

        remainingEnergy: 3,
        maxEnergy: 3,
      };
      const stateWithIncreasedEnergy: DeckStoreState = {
        ...stateWithEnergy,

        remainingEnergy: 4,
        maxEnergy: 4,
      };
      const increaseInEnergy = 1;

      const action = DeckActions.changeEnergy({ energy: increaseInEnergy });
      const actualState = deckReducer(stateWithEnergy, action);
      const expectedState = { ...stateWithIncreasedEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toBe(expectedState.remainingEnergy);
      expect(actualState.maxEnergy).toBe(expectedState.maxEnergy);
    });

    it('when decrease in energy should decrease remaining and max energy', () => {
      const stateWithEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],

        remainingEnergy: 3,
        maxEnergy: 3,
      };
      const stateWithDecreasedEnergy: DeckStoreState = {
        ...stateWithEnergy,

        remainingEnergy: 2,
        maxEnergy: 2,
      };
      const decreaseInEnergy = -1;

      const action = DeckActions.changeEnergy({ energy: decreaseInEnergy });
      const actualState = deckReducer(stateWithEnergy, action);
      const expectedState = { ...stateWithDecreasedEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toBe(expectedState.remainingEnergy);
      expect(actualState.maxEnergy).toBe(expectedState.maxEnergy);
    });

    it('when decrease in energy should decrease remaining and max energy even below zero', () => {
      const stateWithEnergy: DeckStoreState = {
        ...initialState,
        allCards,
        hand: [],

        remainingEnergy: 0,
        maxEnergy: 0,
      };
      const stateWithDecreasedEnergy: DeckStoreState = {
        ...stateWithEnergy,

        remainingEnergy: -1,
        maxEnergy: -1,
      };
      const decreaseInEnergy = -1;

      const action = DeckActions.changeEnergy({ energy: decreaseInEnergy });
      const actualState = deckReducer(stateWithEnergy, action);
      const expectedState = { ...stateWithDecreasedEnergy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.remainingEnergy).toBe(expectedState.remainingEnergy);
      expect(actualState.maxEnergy).toBe(expectedState.maxEnergy);
    });
  });
});
