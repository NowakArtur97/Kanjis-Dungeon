import { Component } from '@angular/core';
import COLORS from 'src/app/common/color.data';
import CharacterUtil from 'src/app/common/utils/character.util';
import Radical from 'src/app/japanese/radical/models/radical.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
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
    if (this.currentCharacter?.id) {
      if (this.isKanji()) {
        cardColor = COLORS.kanji;
      } else if (this.isVocabulary()) {
        cardColor = COLORS.vocabulary;
      }
    }

    return cardColor;
  }
}
