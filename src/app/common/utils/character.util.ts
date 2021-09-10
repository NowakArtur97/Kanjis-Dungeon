import Kanji from 'src/app/japanese/kanji/models/kanji.model';
import Radical from 'src/app/japanese/radical/models/radical.model';
import Word from 'src/app/japanese/vocabulary/models/word.model';

export default class CharacterUtil {
  static isKanji(character: Radical): character is Kanji {
    return (
      character !== undefined &&
      ((character as Kanji)?.onyomi !== undefined ||
        (character as Kanji)?.kunyomi !== undefined ||
        (character as Kanji)?.nanori !== undefined)
    );
  }

  static isVocabulary(character: Radical): character is Word {
    return (
      character !== undefined && (character as Word)?.reading !== undefined
    );
  }
}
