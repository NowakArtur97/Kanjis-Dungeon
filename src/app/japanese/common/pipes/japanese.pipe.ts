import { Pipe, PipeTransform } from '@angular/core';

import HIRAGANA from '../hiragana.data';
import KATAKANA from '../katakana.data';

@Pipe({
  name: 'japanese',
  pure: false,
})
export class JapanesePipe implements PipeTransform {
  private readonly DOUBLE_LOWER_CASE_LETTERS_REG_EXP = /([a-z])\1{1}/g;
  private readonly DOUBLE_UPPER_CASE_LETTERS_REG_EXP = /([A-Z])\1{1}/g;
  private readonly ALL_LETTERS_REG_EXP = /[a-zA-Z]/g;
  private readonly DOUBLED_LETTER_HIRAGANA = 'っ';
  private readonly DOUBLED_LETTER_KATAKANA = 'ッ';

  private allMappings = [...HIRAGANA, ...KATAKANA];

  transform(value: string): string {
    if (!value) {
      return value;
    }

    let afterConversion = this.convertToJapanese(value);
    afterConversion = this.convertDoubleLowerCaseLetters(afterConversion);
    afterConversion = this.convertDoubleUpperCaseLetters(afterConversion);

    return this.convertToJapanese(afterConversion);
  }

  private convertDoubleLowerCaseLetters = (word: string): string =>
    this.convertDoubleLetters(
      word,
      this.DOUBLED_LETTER_HIRAGANA,
      this.DOUBLE_LOWER_CASE_LETTERS_REG_EXP
    );

  private convertDoubleUpperCaseLetters = (word: string): string =>
    this.convertDoubleLetters(
      word,
      this.DOUBLED_LETTER_KATAKANA,
      this.DOUBLE_UPPER_CASE_LETTERS_REG_EXP
    );

  private convertDoubleLetters(
    word: string,
    convertTo: string,
    regExp: RegExp
  ): string {
    if (this.containsAnyLetters(word)) {
      return word.replace(regExp, convertTo);
    }
    return word;
  }

  private convertToJapanese(word: string): string {
    while (this.containsAnyLetters(word)) {
      this.allMappings.forEach((letter) => {
        if (word.includes(letter.record)) {
          word = word.replace(new RegExp(letter.record, 'g'), letter.sign);
        }
      });
    }

    return word;
  }

  private containsAnyLetters = (word: string): boolean =>
    this.ALL_LETTERS_REG_EXP.test(word);
}
