import { createAction, props } from '@ngrx/store';

import Kanji from '../models/kanji.model';

export const saveKanji = createAction('[Kanji] Save Kanji');

export const setKanji = createAction(
  '[Kanji] Set Kanji',
  props<{ kanji: Kanji[] }>()
);

export const fetchKanji = createAction('[Kanji] Fetch Kanji');
