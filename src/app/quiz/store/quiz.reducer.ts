import { Action, createReducer, on } from '@ngrx/store';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import Radical from 'src/app/japanese/radical/models/radical.model';

import QuizOptions from '../models/quiz-options.model';
import * as QuizActions from './quiz.actions';

export interface QuizStoreState {
  quizOptions: QuizOptions;
  nextQuestion: Radical;
  questions: Radical[];
  preferedQuestions: Radical[];
  answers: Radical[];
  mistakes: Radical[];
  shouldShowSummary: boolean;
}

const DEFAULT_EXCLUDED_PROPERTIES = ['characters', 'type'];
const DEFAULT_MIN_NUMBER_OF_PROPERTIES = 1;
const DEFAULT_QUIZ_OPTIONS = {
  numberOfQuestions: 100,
  minNumberOfProperties: DEFAULT_MIN_NUMBER_OF_PROPERTIES,
  shouldShowAnswer: true,
  shouldHideRandomProperties: false,
  excludedProperties: new Map([
    [CharacterType.RADICAL, DEFAULT_EXCLUDED_PROPERTIES],
    [CharacterType.KANJI, DEFAULT_EXCLUDED_PROPERTIES],
    [CharacterType.VOCABULARY, DEFAULT_EXCLUDED_PROPERTIES],
  ]),
  questionTypes: [CharacterType.KANJI],
};
const initialState: QuizStoreState = {
  quizOptions: DEFAULT_QUIZ_OPTIONS,
  nextQuestion: null,
  questions: [],
  // TODO: QuizStoreState: Get from storage
  preferedQuestions: [],
  answers: [],
  mistakes: [],
  shouldShowSummary: false,
};
export {
  initialState,
  DEFAULT_QUIZ_OPTIONS,
  DEFAULT_EXCLUDED_PROPERTIES,
  DEFAULT_MIN_NUMBER_OF_PROPERTIES,
};

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
  })),

  on(QuizActions.repeatQuiz, (state) => ({
    ...state,
    questions: [],
    mistakes: [],
    answers: [],
    shouldShowSummary: false,
  })),

  on(QuizActions.showSummary, (state) => ({
    ...state,
    shouldShowSummary: true,
  })),

  on(QuizActions.resetQuiz, () => ({
    ...initialState,
  })),

  on(QuizActions.addPreferedQuestion, (state, { preferedQuestion }) => ({
    ...state,
    preferedQuestions: [...state.preferedQuestions, preferedQuestion],
  })),

  on(
    QuizActions.removePreferedQuestion,
    (state, { preferedQuestionToRemove }) => ({
      ...state,
      preferedQuestions: state.preferedQuestions.filter(
        (question) =>
          question.characters !== preferedQuestionToRemove.characters
      ),
    })
  )
);

export function quizReducer(
  state: QuizStoreState,
  action: Action
): QuizStoreState {
  return _quizReducer(state, action);
}
