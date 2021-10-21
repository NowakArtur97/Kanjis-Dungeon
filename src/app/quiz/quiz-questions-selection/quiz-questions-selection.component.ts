import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
  isToggled = false;
  private questionSubscription$: Subscription;
  private preferedQuestions: Radical[];
  questions: Radical[];

  private readonly SHOW_MESSAGE = 'Show preffered questions';
  private readonly HIDE_MESSAGE = 'Hide preffered questions';
  message = this.SHOW_MESSAGE;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.questionSubscription$ = this.store
      .select('quiz')
      .subscribe(
        ({ preferedQuestions }) => (this.preferedQuestions = preferedQuestions)
      );
    this.allQuestions = [...RADICALS, ...KANJI, ...VOCABULARY];
  }

  ngOnDestroy = (): void => this.questionSubscription$?.unsubscribe();

  wasSelected = (question: Radical): boolean =>
    this.preferedQuestions.some((q) => q.characters === question.characters);

  onShowPrefferedQuestions(): void {
    this.isToggled = !this.isToggled;
    this.questions = this.isToggled ? this.allQuestions : [];
    this.message = this.isToggled ? this.HIDE_MESSAGE : this.SHOW_MESSAGE;
  }
}
