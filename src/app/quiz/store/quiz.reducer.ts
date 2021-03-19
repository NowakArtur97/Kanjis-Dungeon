import { Action, createReducer, on } from '@ngrx/store';
import Radical from 'src/app/radical/models/radical.model';

import * as QuizActions from './quiz.actions';

export interface QuizStoreState {
  maxNumberOfQuestions: number;
  nextQuestion: Radical;
  questions: Radical[];
  answers: Radical[];
  mistakes: Radical[];
}

const initialState: QuizStoreState = {
  maxNumberOfQuestions: 30,
  nextQuestion: null,
  questions: [],
  answers: [],
  mistakes: [],
};

const _quizReducer = createReducer(
  initialState,

  on(QuizActions.setNextQuestion, (state, { nextQuestion }) => ({
    ...state,
    nextQuestion: { ...nextQuestion },
  })),

  on(QuizActions.setQuestions, (state, { questions }) => ({
    ...state,
    questions: [...questions],
  })),

  on(QuizActions.addAnswer, (state, { answer }) => ({
    ...state,
    answers: [...state.answers, answer],
  })),

  on(QuizActions.clearAnswers, (state) => ({
    ...state,
    answers: [],
  })),

  on(QuizActions.addMistake, (state, { mistake }) => ({
    ...state,
    mistakes: state.mistakes.includes(mistake)
      ? [...state.mistakes]
      : [...state.mistakes, mistake],
  })),

  on(QuizActions.clearMistakes, (state) => ({
    ...state,
    mistakes: [],
  }))
);

export function quizReducer(
  state: QuizStoreState,
  action: Action
): QuizStoreState {
  return _quizReducer(state, action);
}