import CharacterType from 'src/app/common/enums/character-type.enum';

import Word from '../../models/word.model';
import * as VocabularyActions from '../vocabulary.actions';
import { vocabularyReducer, VocabularyStoreState } from '../vocabulary.reducer';

const vocabulary1: Word = {
  id: 1,
  characters: '大人',
  meanings: ['adult', 'mature'],
  reading: 'おとな',
  type: CharacterType.VOCABULARY,
};

const vocabulary2: Word = {
  id: 2,
  characters: '一人',
  meanings: ['alone', 'one person'],
  reading: 'ひとり',
  type: CharacterType.VOCABULARY,
};
const vocabulary = [vocabulary1, vocabulary2];
const initialState: VocabularyStoreState = {
  vocabulary: [],
};
const stateWithVocabulary: VocabularyStoreState = {
  vocabulary,
};

describe('vocabularyReducer', () => {
  describe('VocabularyActions.setVocabulary', () => {
    it('should store vocabulary', () => {
      const action = VocabularyActions.setVocabulary({ vocabulary });
      const actualState = vocabularyReducer(initialState, action);
      const expectedState = { ...stateWithVocabulary };

      expect(actualState).toEqual(expectedState);
      expect(actualState.vocabulary[0]).toBe(vocabulary1);
      expect(actualState.vocabulary[1]).toBe(vocabulary2);
      expect(actualState.vocabulary.length).toBe(2);
    });

    it('should store empty vocabulary list', () => {
      const emptyVocabularyList = [];
      const action = VocabularyActions.setVocabulary({
        vocabulary: emptyVocabularyList,
      });
      const actualState = vocabularyReducer(initialState, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.vocabulary).not.toContain(vocabulary1);
      expect(actualState.vocabulary).not.toContain(vocabulary2);
      expect(actualState.vocabulary.length).toBe(0);
    });
  });
});
