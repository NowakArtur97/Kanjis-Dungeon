import { Component, Input, OnInit } from '@angular/core';

import { QuizSummaryCardComponent } from '../quiz-summary-card/quiz-summary-card.component';

@Component({
  selector: 'app-quiz-questions-selection-card',
  templateUrl: './quiz-questions-selection-card.component.html',
  styleUrls: [
    '../quiz-card/quiz-card.component.css',
    '../quiz-summary-card/quiz-summary-card.component.css',
    './quiz-questions-selection-card.component.css',
  ],
})
export class QuizQuestionsSelectionCardComponent
  extends QuizSummaryCardComponent
  implements OnInit {
  @Input()
  cardColor: string;

  ngOnInit(): void {}
}
