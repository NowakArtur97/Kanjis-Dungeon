import { Action, createReducer, on } from '@ngrx/store';
import CharacterType from 'src/app/common/enums/character-type.enum';
import Radical from 'src/app/radical/models/radical.model';

import QuizOptions from '../models/quiz-options.model';
import * as QuizActions from './quiz.actions';

export interface QuizStoreState {
  quizOptions: QuizOptions;
  nextQuestion: Radical;
  questions: Radical[];
  answers: Radical[];
  mistakes: Radical[];
}

const DEFAULT_EXCLUDED_PROPERTIES = ['characters', 'type'];
const initialState: QuizStoreState = {
  quizOptions: {
    numberOfQuestions: 12,
    minNumberOfProperties: 1,
    excludedProperties: new Map([
      [CharacterType.RADICAL, DEFAULT_EXCLUDED_PROPERTIES],
      [CharacterType.KANJI, DEFAULT_EXCLUDED_PROPERTIES],
      [CharacterType.VOCABULARY, DEFAULT_EXCLUDED_PROPERTIES],
    ]),
    questionTypes: [
      CharacterType.RADICAL,
      CharacterType.KANJI,
      CharacterType.VOCABULARY,
    ],
  },
  nextQuestion: null,
  questions: [],
  answers: [],
  mistakes: [],
};
export { initialState, DEFAULT_EXCLUDED_PROPERTIES };

const _quizReducer = createReducer(
  initialState,

  on(QuizActions.setQuestions, (state, { questions }) => ({
    ...state,
    questions: [...questions],
  })),

  on(QuizActions.setNextQuestion, (state, { nextQuestion }) => ({
    ...state,
    nextQuestion: { ...nextQuestion },
  })),

  on(QuizActions.addAnswer, (state, { answer }) => ({
    ...state,
    questions: state.questions.filter((question) =>
      question.id !== answer.id ? true : question.type !== answer.type
    ),
    mistakes: state.mistakes.filter((mistake) =>
      mistake.id !== answer.id ? true : mistake.type !== answer.type
    ),
    answers: [...state.answers, answer],
  })),

  on(QuizActions.addMistake, (state, { mistake }) => ({
    ...state,
    mistakes: state.mistakes.find(
      (previousMistake) =>
        previousMistake.id === mistake.id &&
        previousMistake.type === mistake.type
    )
      ? [...state.mistakes]
      : [...state.mistakes, mistake],
  })),

  on(QuizActions.changeQuizOptions, (state, { quizOptions }) => ({
    ...state,
    quizOptions,
    questions: [],
    answers: [],
    mistakes: [],
  }))
);

export function quizReducer(
  state: QuizStoreState,
  action: Action
): QuizStoreState {
  return _quizReducer(state, action);
}
