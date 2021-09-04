import { Component } from '@angular/core';
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
}
