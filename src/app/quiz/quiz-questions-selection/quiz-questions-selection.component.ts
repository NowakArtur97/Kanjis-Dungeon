import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import COLORS from 'src/app/common/color.data';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import VOCABULARY from 'src/app/japanese/vocabulary/vocabulary.data';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-questions-selection',
  templateUrl: './quiz-questions-selection.component.html',
  styleUrls: ['./quiz-questions-selection.component.css'],
})
export class QuizQuestionsSelectionComponent implements OnInit, OnDestroy {
  allQuestions: Radical[];
  selectedQuestions: Radical[];
  private questionSubscription$: Subscription;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.questionSubscription$ = this.store
      .select('quiz')
      .subscribe(({ questions }) => (this.selectedQuestions = questions));
    this.allQuestions = [...RADICALS, ...KANJI, ...VOCABULARY];
  }

  ngOnDestroy = (): void => this.questionSubscription$?.unsubscribe();

  setColorBasedOnSelectedQuestions = (question: Radical): string =>
    this.selectedQuestions.some((q) => q.characters === question.characters)
      ? COLORS.correct
      : COLORS.wrong;
}
