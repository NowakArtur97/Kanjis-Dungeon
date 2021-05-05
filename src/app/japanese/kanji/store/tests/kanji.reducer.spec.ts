import CharacterType from 'src/app/japanese/common/enums/character-type.enum';

import Kanji from '../../models/kanji.model';
import * as KanjiActions from '../kanji.actions';
import { kanjiReducer, KanjiStoreState } from '../kanji.reducer';

const kanji1: Kanji = {
  id: 1,
  characters: '上',
  meanings: ['above', 'up', 'over'],
  onyomi: ['じょう'],
  kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
  type: CharacterType.KANJI,
};
const kanji2: Kanji = {
  id: 2,
  characters: '下',
  meanings: ['below', 'down', 'under', 'beneath'],
  onyomi: ['か', 'げ'],
  kunyomi: ['した', 'さ', 'くだ', 'お'],
  type: CharacterType.KANJI,
};
const kanji = [kanji1, kanji2];
const initialState: KanjiStoreState = {
  kanji: [],
};
const stateWithKanji: KanjiStoreState = {
  kanji,
};

describe('kanjiReducer', () => {
  describe('KanjiActions.setKanji', () => {
    it('should store kanji', () => {
      const action = KanjiActions.setKanji({ kanji });
      const actualState = kanjiReducer(initialState, action);
      const expectedState = { ...stateWithKanji };

      expect(actualState).toEqual(expectedState);
      expect(actualState.kanji[0]).toEqual(kanji1);
      expect(actualState.kanji[1]).toEqual(kanji2);
      expect(actualState.kanji.length).toBe(2);
    });

    it('should store empty kanji list', () => {
      const emptyKanjiList = [];
      const action = KanjiActions.setKanji({
        kanji: emptyKanjiList,
      });
      const actualState = kanjiReducer(initialState, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.kanji).not.toContain(kanji1);
      expect(actualState.kanji).not.toContain(kanji2);
      expect(actualState.kanji.length).toBe(0);
    });
  });
});
