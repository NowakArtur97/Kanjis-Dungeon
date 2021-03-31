import { createAction, props } from '@ngrx/store';
import Radical from 'src/app/radical/models/radical.model';

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

export const clearQuiz = createAction('[Quiz] Clear Quiz');
