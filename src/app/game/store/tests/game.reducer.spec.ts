import CharacterPlayedAnimation from '../../character/models/character-played-animation.model';
import CharacterPosition from '../../character/models/character-position.model';
import { attackCard } from '../../deck/deck.data';
import GamePhase from '../../enums/game-phase.enum';
import GameTurn from '../../enums/game-turn.enum';
import defaultPlayer from '../../player/player.data';
import * as GameActions from '../game.actions';
import { gameReducer, GameStoreState, initialState } from '../game.reducer';

describe('gameReducer', () => {
  const animationPosition: CharacterPosition = {
    x: 10,
    y: 20,
  };
  const playedAnimation: CharacterPlayedAnimation = {
    character: defaultPlayer,
    animationName: attackCard.animationName,
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
    animationPosition,
  };

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
      const action = GameActions.finishCharacterAnimation();
      const actualState = gameReducer(stateWithAnimationAndPosition, action);
      const expectedState = { ...stateWithoutAnimation };

      expect(actualState).toEqual(expectedState);
      expect(actualState.playedAnimation).toBeNull();
      expect(actualState.animationPosition).toBeNull();
    });
  });

  describe('GameActions.setAnimationPosition', () => {
    it('should set animation position', () => {
      const action = GameActions.setAnimationPosition({ animationPosition });
      const actualState = gameReducer(stateWithAnimation, action);
      const expectedState = { ...stateWithAnimationAndPosition };

      expect(actualState).toEqual(expectedState);
      expect(actualState.animationPosition).toEqual(animationPosition);
    });
  });
});
