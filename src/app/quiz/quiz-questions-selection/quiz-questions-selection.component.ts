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
  private allQuestions: Radical[];
  loadedQuestions: Radical[];
  isToggled = false;
  private questionSubscription$: Subscription;
  private preferedQuestions: Radical[];

  private readonly SHOW_MESSAGE = 'Show preffered questions';
  private readonly HIDE_MESSAGE = 'Hide preffered questions';
  message = this.SHOW_MESSAGE;
  private prefferedQuestionsInterval: any;

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
    this.message = this.isToggled ? this.HIDE_MESSAGE : this.SHOW_MESSAGE;
    clearInterval(this.prefferedQuestionsInterval);
    if (this.isToggled) {
      this.loadPrefferedQuestions();
    } else {
      this.loadedQuestions = [];
    }
  }

  // TODO: REFACTOR with JapaneseAlphabetComponent
  private loadPrefferedQuestions(): void {
    this.loadedQuestions = [];
    let index = 0;
    const elementsDelay = 20;

    this.prefferedQuestionsInterval = setInterval(() => {
      if (index < this.allQuestions.length) {
        this.loadedQuestions.push(this.allQuestions[index]);
        index++;
      } else {
        clearInterval(this.prefferedQuestionsInterval);
      }
    }, elementsDelay);
  }
}
