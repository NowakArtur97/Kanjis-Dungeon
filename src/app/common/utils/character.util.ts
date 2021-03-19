import Kanji from 'src/app/kanji/models/kanji.model';
import Word from 'src/app/vocabulary/models/word.model';

export default class CharacterUtil {
  static isKanji(character: any): character is Kanji {
    return (
      (character as Kanji).onyomi !== undefined ||
      (character as Kanji).kunyomi !== undefined ||
      (character as Kanji).nanori !== undefined
    );
  }

  static isVocabulary(character: any): character is Word {
    return (character as Word).reading !== undefined;
  }
}
