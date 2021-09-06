import { createAction, props } from '@ngrx/store';
import Radical from 'src/app/japanese/radical/models/radical.model';

import QuizOptions from '../models/quiz-options.model';

export const setNextQuestion = createAction(
  '[Quiz] Set Next Question',
  props<{ nextQuestion: Radical }>()
);

export const setQuestions = createAction(
  '[Quiz] Set Questions',
  props<{ questions: Radical[] }>()
);

export const addAnswer = createAction(
  '[Quiz] Add Answer',
  props<{ answer: Radical }>()
);

export const addMistake = createAction(
  '[Quiz] Add Mistake',
  props<{ mistake: Radical }>()
);

export const changeQuizOptions = createAction(
  '[Quiz] Change Quiz Options',
  props<{ quizOptions: QuizOptions }>()
);

export const shouldShowSummary = createAction(
  '[Quiz] Should show Summary',
  props<{ shouldShowSummary: boolean }>()
);
