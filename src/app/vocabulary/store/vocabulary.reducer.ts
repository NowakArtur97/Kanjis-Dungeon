import { Action, createReducer, on } from '@ngrx/store';

import Word from '../models/word.model';
import * as VocabularyActions from './vocabulary.actions';

export interface VocabularyStoreState {
  vocabulary: Word[];
}

const initialState: VocabularyStoreState = {
  vocabulary: [
    {
      id: 1,
      characters: '大人',
      meanings: ['adult', 'mature'],
      reading: 'おとな',
    },
    {
      id: 2,
      characters: '一人',
      meanings: ['alone', 'one person'],
      reading: 'ひとり',
    },
  ],
};

const _vocabularyReducer = createReducer(
  initialState,

  on(VocabularyActions.setVocabulary, (state, { vocabulary }) => ({
    ...state,
    vocabulary: [...vocabulary],
  }))
);

export function vocabularyReducer(
  state: VocabularyStoreState,
  action: Action
): VocabularyStoreState {
  return _vocabularyReducer(state, action);
}
