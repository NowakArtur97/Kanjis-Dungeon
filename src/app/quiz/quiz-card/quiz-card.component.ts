import { Component } from '@angular/core';
import COLORS from 'src/app/common/color.data';
import CharacterUtil from 'src/app/japanese/common/utils/character.util';
import Radical from 'src/app/japanese/radical/models/radical.model';

@Component({
  selector: 'app-quiz-card',
  template: '',
  styleUrls: ['./quiz-card.component.css'],
})
export abstract class QuizCardComponent {
  currentCharacter: Radical;

  constructor() {}

  isKanji = (): boolean => CharacterUtil.isKanji(this.currentCharacter);

  isVocabulary = (): boolean =>
    CharacterUtil.isVocabulary(this.currentCharacter);

  hasProperty = (property: string) =>
    this.currentCharacter[property] !== undefined;

  getCardColor(): string {
    let cardColor = COLORS.radical;
    if (this.isKanji()) {
      cardColor = COLORS.kanji;
    } else if (this.isVocabulary()) {
      cardColor = COLORS.vocabulary;
    }

    return cardColor;
  }
}
