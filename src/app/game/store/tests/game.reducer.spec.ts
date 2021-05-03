import * as GameActions from '../game.actions';
import { gameReducer, GameStoreState } from '../game.reducer';

const initialState: GameStoreState = {
  level: 1,
};

describe('gameReducer', () => {
  describe('GameActions.chooseLevel', () => {
    it('should change level', () => {
      const level = 2;
      const stateWithSecondLevel: GameStoreState = {
        level,
      };

      const action = GameActions.chooseLevel({ level });
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithSecondLevel };

      expect(actualState).toEqual(expectedState);
      expect(actualState.level).toBe(level);
    });
  });
});
