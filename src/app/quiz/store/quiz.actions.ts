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

export const repeatQuiz = createAction('[Quiz] Repeat Quiz');

export const showSummary = createAction('[Quiz] Show Summary');

export const resetQuiz = createAction('[Quiz] Reset Quiz');

export const getPreferredQuestionsFromStorage = createAction(
  '[Quiz] Get Preferred Questions from Storage'
);

export const setPreferredQuestions = createAction(
  '[Quiz] Set Preferred Questions',
  props<{ preferredQuestions: Radical[] }>()
);

export const addPreferredQuestion = createAction(
  '[Quiz] Add Preferred Question',
  props<{ preferredQuestion: Radical }>()
);

export const addPreferredQuestions = createAction(
  '[Quiz] Add Preferred Questions',
  props<{ preferredQuestions: Radical[] }>()
);

export const removePreferredQuestion = createAction(
  '[Quiz] Remove from Preferred Question',
  props<{ preferredQuestionToRemove: Radical }>()
);
