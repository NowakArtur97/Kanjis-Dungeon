import { Component, Input, OnInit } from '@angular/core';
import Radical from 'src/app/japanese/radical/models/radical.model';

import { QuizCardComponent } from '../quiz-card/quiz-card.component';

@Component({
  selector: 'app-quiz-summary-card',
  templateUrl: './quiz-summary-card.component.html',
  styleUrls: [
    '../quiz-card/quiz-card.component.css',
    './quiz-summary-card.component.css',
  ],
})
export class QuizSummaryCardComponent
  extends QuizCardComponent
  implements OnInit {
  @Input()
  currentCharacter: Radical;
  @Input()
  cardColor: string;

  ngOnInit(): void {
    this.cardColor = this.cardColor || this.getCardColor();
  }
}
