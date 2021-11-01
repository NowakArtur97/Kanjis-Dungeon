import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import COLORS from 'src/app/common/color.data';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
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
  cardColor: string;
  @Input()
  wasSelected: boolean;
  @Output() selectedEvent = new EventEmitter();

  constructor(private store: Store<AppStoreState>) {
    super();
  }

  ngOnInit(): void {
    this.setColorBasedOnBeingSelected();
  }

  onSelect(event: MouseEvent): void {
    this.wasSelected = !this.wasSelected;
    this.store.dispatch(
      this.wasSelected
        ? QuizActions.addPreferedQuestion({
            preferedQuestion: this.currentCharacter,
          })
        : QuizActions.removePreferedQuestion({
            preferedQuestionToRemove: this.currentCharacter,
          })
    );
    this.setColorBasedOnBeingSelected();
    this.emitSelectedEvent(event);
  }
  setColorBasedOnBeingSelected(): void {
    this.cardColor = this.wasSelected ? COLORS.correct : COLORS.wrong;
  }

  emitSelectedEvent(event: MouseEvent) {
    const currentCharacter = this.currentCharacter;
    const wasShiftPressed = event.shiftKey;
    this.selectedEvent.emit({
      chosenQuestion: currentCharacter,
      wasShiftPressed,
    });
  }
}
