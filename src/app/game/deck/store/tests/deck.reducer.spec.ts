import GameCardType from '../../enums/game-card-type.enum';
import GameCard from '../../models/game-card.model';
import * as DeckActions from '../deck.actions';
import { deckReducer, DeckStoreState } from '../deck.reducer';

const allCards: GameCard[] = [
  { name: 'Attack', cost: 2, type: GameCardType.ATTACK, description: 'attack' },
  {
    name: 'Defence',
    cost: 2,
    type: GameCardType.SKILL,
    description: 'defence',
  },
  { name: 'Power', cost: 2, type: GameCardType.POWER, description: 'power' },
];
const hand = [
  {
    name: 'Attack',
    cost: 2,
    type: GameCardType.ATTACK,
    description: 'attack',
  },
];
const initialState: DeckStoreState = {
  allCards: [],
  hand: [],
  chosenCard: null,
  numberOfCards: 6,
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
      const hand = [
        {
          name: 'Attack',
          cost: 2,
          type: GameCardType.ATTACK,
          description: 'attack',
        },
      ];

      const action = DeckActions.getCardsToHand({ hand });
      const actualState = deckReducer(stateWithCards, action);
      const expectedState = { ...stateWithHand };

      expect(actualState).toEqual(expectedState);
      expect(actualState.hand).toEqual(hand);
    });
  });

  describe('DeckActions.chooseCard', () => {
    it('should choose card', () => {
      const chosenCard = {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'attack',
      };
      const stateWithChosenCard: DeckStoreState = {
        ...initialState,
        allCards,
        hand,
        chosenCard,
      };

      const action = DeckActions.chooseCard({ chosenCard });
      const actualState = deckReducer(stateWithHand, action);
      const expectedState = { ...stateWithChosenCard };

      expect(actualState).toEqual(expectedState);
      expect(actualState.chosenCard).toEqual(chosenCard);
    });
  });
});
