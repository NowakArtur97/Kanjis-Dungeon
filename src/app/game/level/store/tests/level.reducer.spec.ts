import { pigWarrior } from 'src/app/game/enemy/enemy.data';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import { DEFAULT_QUIZ_OPTIONS } from 'src/app/quiz/store/quiz.reducer';

import LevelType from '../../enums/level-type.enum';
import Level from '../../models/level.model';
import * as LevelActions from '../level.actions';
import { initialState, levelReducer, LevelStoreState } from '../level.reducer';

describe('levelReducer', () => {
  const level: Level = {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  };
  const stateWithSecondLevel: LevelStoreState = {
    ...initialState,
    level,
  };

  describe('LevelActions.chooseLevel', () => {
    it('should change level', () => {
      const action = LevelActions.chooseLevel({ level });
      const actualState = levelReducer(initialState, action);
      const expectedState = { ...stateWithSecondLevel };

      expect(actualState).toEqual(expectedState);
      expect(actualState.level).toBe(level);
    });
  });

  describe('LevelActions.resetLevel', () => {
    it('should reset level', () => {
      const action = LevelActions.resetLevel();
      const actualState = levelReducer(stateWithSecondLevel, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.level).toBeNull();
    });
  });
});
