import { createAction, props } from '@ngrx/store';
import Radical from 'src/app/radical/models/radical.model';

export const setQuestions = createAction(
  '[Quiz] Set Questions',
  props<{ questions: Radical[] }>()
);

export const addAnswer = createAction(
  '[Quiz] Add Answer',
  props<{ answer: Radical }>()
);

export const clearAnswers = createAction('[Quiz] Clear Answers');

export const addMistake = createAction(
  '[Quiz] Add Mistake',
  props<{ mistake: Radical }>()
);

export const clearMistakes = createAction('[Quiz] Clear Mistakes');
