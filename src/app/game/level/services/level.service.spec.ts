import { getTestBed, TestBed } from '@angular/core/testing';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import { DEFAULT_QUIZ_OPTIONS } from 'src/app/quiz/store/quiz.reducer';

import { imp, pigWarrior } from '../../enemy/enemy.data';
import LevelType from '../enums/level-type.enum';
import Level from '../models/level.model';
import LevelService from './level.service';

describe('levelService', () => {
  let injector: TestBed;
  let levelService: LevelService;

  const level1: Level = {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  };
  const level1WithId: Level = {
    ...level1,
    id: 1,
  };
  const level2: Level = {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  };
  const level2WithId: Level = {
    ...level2,
    id: 2,
  };
  const level3: Level = {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  };
  const level3WithId: Level = {
    ...level3,
    id: 1,
  };
  const level4: Level = {
    levelType: LevelType.MIX,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 24,
      questionTypes: [
        CharacterType.RADICAL,
        CharacterType.KANJI,
        CharacterType.VOCABULARY,
      ],
    },
  };
  const level4WithId: Level = {
    ...level4,
    id: 1,
  };
  const allLevels: Level[] = [level1, level2, level3, level4];
  const allLevelsWithIds: Level[] = [
    level1WithId,
    level2WithId,
    level3WithId,
    level4WithId,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [LevelService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    levelService = injector.inject(LevelService);
  });

  describe('when setup levels ids', () => {
    it('should return levels with ids', () => {
      const allLevelsActual = levelService.setupLevelsIds(allLevels);

      expect(allLevelsActual).toEqual(allLevelsWithIds);
    });
  });

  describe('when choose quiz options for level', () => {
    it('should return options based on level and level type', () => {
      const allLevelsActual = levelService.setupLevelsIds(allLevels);

      expect(allLevelsActual).toEqual(allLevelsWithIds);
    });
  });
});
