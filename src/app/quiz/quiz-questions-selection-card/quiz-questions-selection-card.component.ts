import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import COLORS from 'src/app/common/color.data';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
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
  implements OnInit, OnDestroy {
  cardColor: string;
  @Output() selectedEvent = new EventEmitter();
  private wasSelected: boolean;
  private preferredQuestionsSubScription$: Subscription;

  constructor(private store: Store<AppStoreState>) {
    super();
  }

  ngOnInit(): void {
    this.preferredQuestionsSubScription$ = this.store
      .select('quiz')
      .subscribe(({ preferredQuestions }) => {
        this.wasSelected = preferredQuestions.some(
          (q) =>
            q.characters === this.currentCharacter.characters &&
            q.type === this.currentCharacter.type
        );
        this.setColorBasedOnBeingSelected();
      });
  }

  ngOnDestroy = (): void => this.preferredQuestionsSubScription$?.unsubscribe();

  onSelect(event: MouseEvent): boolean {
    const { shiftKey: wasShiftPressed, which: mouseButton } = event;
    this.store.dispatch(
      this.wasSelected
        ? QuizActions.removePreferredQuestion({
            preferredQuestionToRemove: this.currentCharacter,
          })
        : QuizActions.addPreferredQuestion({
            preferredQuestion: this.currentCharacter,
          })
    );
    this.emitSelectedEvent(wasShiftPressed, mouseButton);
    return false;
  }

  private setColorBasedOnBeingSelected(): void {
    if (this.wasSelected) {
      switch (this.currentCharacter.type) {
        case CharacterType.RADICAL:
          this.cardColor = COLORS.radical;
          break;
        case CharacterType.KANJI:
          this.cardColor = COLORS.kanji;
          break;
        case CharacterType.VOCABULARY:
          this.cardColor = COLORS.vocabulary;
          break;
      }
    } else {
      this.cardColor = COLORS.wrong;
    }
  }

  private emitSelectedEvent(
    wasShiftPressed: boolean,
    mouseButton: number
  ): void {
    const currentCharacter = this.currentCharacter;
    this.selectedEvent.emit({
      chosenQuestion: currentCharacter,
      wasShiftPressed,
      mouseButton,
    });
  }
}
