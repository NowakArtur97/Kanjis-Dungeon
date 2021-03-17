import { Action, createReducer, on } from '@ngrx/store';

import Kanji from '../models/kanji.model';
import * as KanjiActions from './kanji.actions';

export interface KanjiStoreState {
  kanji: Kanji[];
}

const initialState: KanjiStoreState = {
  kanji: [],
};

const _kanjiReducer = createReducer(
  initialState,

  on(KanjiActions.setKanji, (state, { kanji }) => ({
    ...state,
    kanji: [...kanji],
  }))
);

export function kanjiReducer(
  state: KanjiStoreState,
  action: Action
): KanjiStoreState {
  return _kanjiReducer(state, action);
}
