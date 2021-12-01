import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import { DEFAULT_QUIZ_OPTIONS } from 'src/app/quiz/store/quiz.reducer';

import { imp, pigWarrior } from '../enemy/enemy.data';
import LevelType from './enums/level-type.enum';
import Level from './models/level.model';

// TODO: ALL_LEVELS: Generate level by code
const ALL_LEVELS: Level[] = [
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 1,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior, imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 24,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior, imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 24,
      questionTypes: [CharacterType.RADICAL],
    },
  },
  {
    levelType: LevelType.RADICAL,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.RADICAL],
    },
  },

  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 2,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [pigWarrior, imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 24,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [pigWarrior, imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 24,
      questionTypes: [CharacterType.KANJI],
    },
  },
  {
    levelType: LevelType.KANJI,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 6,
      questionTypes: [CharacterType.KANJI],
    },
  },

  {
    levelType: LevelType.VOCABULARY,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 5,
      questionTypes: [CharacterType.VOCABULARY],
    },
  },
  {
    levelType: LevelType.VOCABULARY,
    enemies: [imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 5,
      questionTypes: [CharacterType.VOCABULARY],
    },
  },

  {
    levelType: LevelType.MIX,
    enemies: [pigWarrior],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 20,
      questionTypes: [
        CharacterType.RADICAL,
        CharacterType.KANJI,
        CharacterType.VOCABULARY,
      ],
    },
  },
  {
    levelType: LevelType.MIX,
    enemies: [pigWarrior, imp],
    quizOptions: {
      ...DEFAULT_QUIZ_OPTIONS,
      numberOfQuestions: 20,
      questionTypes: [
        CharacterType.RADICAL,
        CharacterType.KANJI,
        CharacterType.VOCABULARY,
      ],
    },
  },
];

export default ALL_LEVELS;
