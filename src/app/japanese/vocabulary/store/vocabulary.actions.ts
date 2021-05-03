import { createAction, props } from '@ngrx/store';

import Word from '../models/word.model';

export const saveVocabulary = createAction('[Vocabulary] Save Vocabulary');

export const setVocabulary = createAction(
  '[Vocabulary] Set Vocabulary',
  props<{ vocabulary: Word[] }>()
);

export const fetchVocabulary = createAction('[Vocabulary] Fetch Vocabulary');
