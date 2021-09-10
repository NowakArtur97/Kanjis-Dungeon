import CharacterPlayedAnimation from '../../character/models/character-played-animation.model';
import CharacterPosition from '../../character/models/character-position.model';
import { phoenixSummoningCard } from '../../deck/deck.data';
import GamePhase from '../../enums/game-phase.enum';
import GameResult from '../../enums/game-result.enum';
import GameTurn from '../../enums/game-turn.enum';
import defaultPlayer from '../../player/player.data';
import * as GameActions from '../game.actions';
import { gameReducer, GameStoreState, initialState } from '../game.reducer';

describe('gameReducer', () => {
  const animationPosition: CharacterPosition = {
    x: 10,
    y: 20,
    topOffset: 50,
  };
  const playedAnimation: CharacterPlayedAnimation = {
    character: defaultPlayer,
    animationName: phoenixSummoningCard.animationName,
    animationPosition,
  };
  const stateWithoutAnimation: GameStoreState = {
    ...initialState,
  };
  const stateWithAnimation: GameStoreState = {
    ...initialState,
    playedAnimation,
  };
  const stateWithAnimationAndPosition: GameStoreState = {
    ...initialState,
    playedAnimation,
  };

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
      const stateWithQuizPhase: GameStoreState = {
        ...initialState,
        phase: GamePhase.QUIZ,
      };
      const stateWithBattlePhase: GameStoreState = {
        ...initialState,
        phase,
      };

      const action = GameActions.changePhase();
      const actualState = gameReducer(stateWithQuizPhase, action);
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

  describe('GameActions.startCharacterAnimation', () => {
    it('should set played animation', () => {
      const action = GameActions.startCharacterAnimation({ playedAnimation });
      const actualState = gameReducer(stateWithoutAnimation, action);
      const expectedState = { ...stateWithAnimation };

      expect(actualState).toEqual(expectedState);
      expect(actualState.playedAnimation).toEqual(playedAnimation);
    });
  });

  describe('GameActions.finishCharacterAnimation', () => {
    it('should set played animation with position as nulls', () => {
      const action = GameActions.finishCharacterAnimation({
        character: defaultPlayer,
      });
      const actualState = gameReducer(stateWithAnimationAndPosition, action);
      const expectedState = { ...stateWithoutAnimation };

      expect(actualState).toEqual(expectedState);
      expect(actualState.playedAnimation).toBeNull();
    });
  });

  describe('GameActions.completeLevel', () => {
    it('should set Win result', () => {
      const result = GameResult.WIN;
      const action = GameActions.completeLevel({ result });
      const stateWithResult: GameStoreState = {
        ...initialState,
        result,
      };
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithResult };

      expect(actualState).toEqual(expectedState);
      expect(actualState.result).toBe(result);
    });

    it('should set Lose result', () => {
      const result = GameResult.LOSE;
      const action = GameActions.completeLevel({ result });
      const stateWithResult: GameStoreState = {
        ...initialState,
        result,
      };
      const actualState = gameReducer(initialState, action);
      const expectedState = { ...stateWithResult };

      expect(actualState).toEqual(expectedState);
      expect(actualState.result).toBe(result);
    });
  });
});
