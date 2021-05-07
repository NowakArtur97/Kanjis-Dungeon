import GameTurn from '../../enums/game-turn.enum';
import * as GameActions from '../game.actions';
import { gameReducer, GameStoreState } from '../game.reducer';

const initialState: GameStoreState = {
  level: 0,
  turn: GameTurn.ENEMY_TURN,
};

describe('gameReducer', () => {
  describe('GameActions.chooseLevel', () => {
    it('should change level', () => {
      const level = 2;
      const stateWithSecondLevel: GameStoreState = {
        ...initialState,
        level,
      };

      const action = GameActions.chooseLevel({ level });
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithSecondLevel };

      expect(actualState).toEqual(expectedState);
      expect(actualState.level).toBe(level);
    });
  });

  describe('GameActions.changeTurn', () => {
    it('should change turn', () => {
      const turn = GameTurn.PLAYER_TURN;
      const stateWithPlayerTurn: GameStoreState = {
        ...initialState,
        turn,
      };

      const action = GameActions.changeTurn();
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithPlayerTurn };

      expect(actualState).toEqual(expectedState);
      expect(actualState.turn).toEqual(turn);
    });
  });
});
