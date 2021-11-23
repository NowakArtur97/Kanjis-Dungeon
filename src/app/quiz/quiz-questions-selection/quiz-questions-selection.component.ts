import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import appearTrigger from 'src/app/common/animations/appear.animation';
import slideInTrigger from 'src/app/common/animations/slide-in.animation';
import COLORS from 'src/app/common/color.data';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import MouseButtonClick from 'src/app/japanese/common/enums/mouse-button-click.enum';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import VOCABULARY from 'src/app/japanese/vocabulary/vocabulary.data';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';

@Component({
  selector: 'app-quiz-questions-selection',
  templateUrl: './quiz-questions-selection.component.html',
  styleUrls: ['./quiz-questions-selection.component.css'],
  animations: [
    appearTrigger('in'),
    slideInTrigger('hidden', 'translateX(-100vw)', 'revealed', 'translateX(0)'),
  ],
})
export class QuizQuestionsSelectionComponent implements OnInit, OnDestroy {
  private readonly LOAD_OFFSET = 200;
  private readonly ELEMENTS_DELAY = 20;

  private questionsByType = {
    Radical: RADICALS,
    Kanji: KANJI,
    Vocabulary: VOCABULARY,
  };
  private chosenQuestions = RADICALS;
  chosenCategory = CharacterType.RADICAL;
  categoryColor = COLORS.radical;
  characterType = CharacterType;
  loadedQuestions: Radical[];
  isToggled = false;
  private questionSubscription$: Subscription;
  private preferredQuestions: Radical[];

  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  toggleState = this.HIDDEN_STATE;
  private readonly SHOW_MESSAGE = 'Show preferred questions';
  private readonly HIDE_MESSAGE = 'Hide preferred questions';
  message = this.SHOW_MESSAGE;
  private preferredQuestionsInterval: any;
  private loadTimer: any;

  display = 'none';
  private displayMode = { hidden: 'none', show: 'block' };

  lastChosenQuestion: Radical;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.questionSubscription$ = this.store
      .select('quiz')
      .subscribe(
        ({ preferredQuestions }) =>
          (this.preferredQuestions = preferredQuestions)
      );
  }

  ngOnDestroy = (): void => this.questionSubscription$?.unsubscribe();

  onShowPreferredQuestions(): void {
    this.isToggled = !this.isToggled;
    clearTimeout(this.loadTimer);
    clearTimeout(this.preferredQuestionsInterval);

    if (this.isToggled) {
      this.message = this.HIDE_MESSAGE;
      this.toggleState = this.REVEALED_STATE;
      this.loadTimer = setTimeout(
        () => this.loadPreferredQuestions(),
        this.LOAD_OFFSET
      );
    } else {
      this.message = this.SHOW_MESSAGE;
      this.toggleState = this.HIDDEN_STATE;
      this.loadTimer = setTimeout(
        () => (this.loadedQuestions = []),
        this.LOAD_OFFSET
      );
    }
  }

  // TODO: REFACTOR with JapaneseAlphabetComponent
  private loadPreferredQuestions(): void {
    let index = 0;
    this.loadedQuestions = [];
    clearInterval(this.preferredQuestionsInterval);

    this.preferredQuestionsInterval = setInterval(() => {
      if (index < this.chosenQuestions.length) {
        this.loadedQuestions.push(this.chosenQuestions[index]);
        index++;
      } else {
        clearInterval(this.preferredQuestionsInterval);
      }
    }, this.ELEMENTS_DELAY);
  }

  onChangeCategory(chosenCategory: CharacterType): void {
    this.chosenCategory = chosenCategory;
    this.chosenQuestions = this.questionsByType[this.chosenCategory];
    switch (this.chosenCategory) {
      case CharacterType.RADICAL:
        this.categoryColor = COLORS.radical;
        break;
      case CharacterType.KANJI:
        this.categoryColor = COLORS.kanji;
        break;
      case CharacterType.VOCABULARY:
        this.categoryColor = COLORS.vocabulary;
        break;
    }
    this.loadPreferredQuestions();
  }

  // TODO: REFACTOR with JapaneseAlphabetComponent (move to directive)
  onWindowHidden(): void {
    this.display = this.isToggled
      ? this.displayMode.show
      : this.displayMode.hidden;
  }

  onSelectedQuestion({
    chosenQuestion,
    wasShiftPressed,
    mouseButton,
  }: {
    chosenQuestion: Radical;
    wasShiftPressed: boolean;
    mouseButton: number;
  }): void {
    if (
      wasShiftPressed &&
      this.lastChosenQuestion &&
      chosenQuestion.type === this.lastChosenQuestion.type
    ) {
      const chosenQuestions = this.findChosenQuestions(chosenQuestion);
      if (mouseButton === MouseButtonClick.LEFT) {
        const preferredQuestions = chosenQuestions.filter(
          (question) => !this.preferredQuestions.includes(question)
        );
        if (preferredQuestions.length > 0) {
          this.store.dispatch(
            QuizActions.addPreferredQuestions({
              preferredQuestions,
            })
          );
        }
      } else if (mouseButton === MouseButtonClick.RIGHT) {
        const preferredQuestionsToRemove = chosenQuestions.filter((question) =>
          this.preferredQuestions.some(
            (preferredQuestion) =>
              JSON.stringify(preferredQuestion) === JSON.stringify(question)
          )
        );
        if (preferredQuestionsToRemove.length > 0) {
          this.store.dispatch(
            QuizActions.removePreferredQuestions({
              preferredQuestionsToRemove,
            })
          );
        }
      }
    }
    this.lastChosenQuestion = chosenQuestion;
  }

  private findChosenQuestions(chosenQuestion: Radical): Radical[] {
    const lastChosenQuestionIndex = this.chosenQuestions.indexOf(
      this.lastChosenQuestion
    );
    const chosenQuestionIndex = this.chosenQuestions.indexOf(chosenQuestion);
    const chosenQuestions =
      lastChosenQuestionIndex > chosenQuestionIndex
        ? this.chosenQuestions.slice(
            chosenQuestionIndex,
            lastChosenQuestionIndex + 1
          )
        : this.chosenQuestions.slice(
            lastChosenQuestionIndex,
            chosenQuestionIndex + 1
          );
    return chosenQuestions;
  }
}
