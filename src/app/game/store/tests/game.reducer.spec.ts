import GamePhase from '../../enums/game-phase.enum';
import GameTurn from '../../enums/game-turn.enum';
import * as GameActions from '../game.actions';
import { gameReducer, GameStoreState, initialState } from '../game.reducer';

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
    it('should change turn from Player to Enemy', () => {
      const turn = GameTurn.ENEMY_TURN;
      const stateWithEnemyTurn: GameStoreState = {
        ...initialState,
        turn,
      };

      const action = GameActions.changeTurn();
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithEnemyTurn };

      expect(actualState).toEqual(expectedState);
      expect(actualState.turn).toEqual(turn);
    });

    it('should change turn from Enemy to Player', () => {
      const turn = GameTurn.PLAYER_TURN;
      const stateWithEnemyTurn: GameStoreState = {
        ...initialState,
        turn: GameTurn.ENEMY_TURN,
      };
      const stateWithPlayerTurn: GameStoreState = {
        ...initialState,
        turn,
      };

      const action = GameActions.changeTurn();
      const actualState = gameReducer(stateWithEnemyTurn, action);
      const expectedState = { ...stateWithPlayerTurn };

      expect(actualState).toEqual(expectedState);
      expect(actualState.turn).toEqual(turn);
    });
  });

  describe('GameActions.changePhase', () => {
    it('should change phase from Quiz to Battle', () => {
      const phase = GamePhase.BATTLE;
      const stateWithBattlePhase: GameStoreState = {
        ...initialState,
        phase,
      };

      const action = GameActions.changePhase();
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithBattlePhase };

      expect(actualState).toEqual(expectedState);
      expect(actualState.phase).toEqual(phase);
    });

    it('should change phase from Battle to Quiz', () => {
      const phase = GamePhase.QUIZ;
      const stateWithBattlePhase: GameStoreState = {
        ...initialState,
        phase: GamePhase.BATTLE,
      };
      const stateWithQuizPhase: GameStoreState = {
        ...initialState,
        phase,
      };

      const action = GameActions.changePhase();
      const actualState = gameReducer(stateWithBattlePhase, action);
      const expectedState = { ...stateWithQuizPhase };

      expect(actualState).toEqual(expectedState);
      expect(actualState.phase).toEqual(phase);
    });
  });
});
