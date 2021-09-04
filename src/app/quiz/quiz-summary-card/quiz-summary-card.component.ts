import { Component, Input, OnInit } from '@angular/core';
import CharacterUtil from 'src/app/common/utils/character.util';
import Radical from 'src/app/japanese/radical/models/radical.model';

@Component({
  selector: 'app-quiz-summary-card',
  templateUrl: './quiz-summary-card.component.html',
  styleUrls: [
    '../quiz-card/quiz-card.component.css',
    './quiz-summary-card.component.css',
  ],
})
export class QuizSummaryCardComponent implements OnInit {
  @Input()
  character: Radical;

  constructor() {}

  ngOnInit(): void {}

  isKanji = (): boolean => CharacterUtil.isKanji(this.character);

  isVocabulary = (): boolean => CharacterUtil.isVocabulary(this.character);

  hasProperty = (property: string) => this.character[property] !== undefined;
}
