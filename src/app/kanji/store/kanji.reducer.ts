import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';

import Kanji from '../models/kanji.model';
import * as KanjiActions from './kanji.actions';

export interface KanjiStoreState {
  kanji: Kanji[];
}

const initialState: KanjiStoreState = {
  kanji: [
    {
      id: 1,
      characters: '上',
      meanings: ['above', 'up', 'over'],
      onyomi: ['じょう'],
      kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
    },
    {
      id: 2,
      characters: '下',
      meanings: ['below', 'down', 'under', 'beneath'],
      onyomi: ['か', 'げ'],
      kunyomi: ['した', 'さ', 'くだ', 'お'],
    },
  ],
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
