import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import appearTrigger from 'src/app/common/animations/appear.animation';
import slideInTrigger from 'src/app/common/animations/slide-in.animation';
import CharacterType from 'src/app/japanese/common/enums/character-type.enum';
import KANJI from 'src/app/japanese/kanji/kanji.data';
import Radical from 'src/app/japanese/radical/models/radical.model';
import RADICALS from 'src/app/japanese/radical/radical.data';
import VOCABULARY from 'src/app/japanese/vocabulary/vocabulary.data';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-questions-selection',
  templateUrl: './quiz-questions-selection.component.html',
  styleUrls: ['./quiz-questions-selection.component.css'],
  animations: [
    appearTrigger('in'),
    slideInTrigger(
      'show',
      'hidden',
      'translateX(-100vw)',
      'revealed',
      'translateX(0)'
    ),
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
  characterType = CharacterType;
  loadedQuestions: Radical[];
  isToggled = false;
  private questionSubscription$: Subscription;
  private preferedQuestions: Radical[];

  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  toggleState = this.HIDDEN_STATE;
  private readonly SHOW_MESSAGE = 'Show preffered questions';
  private readonly HIDE_MESSAGE = 'Hide preffered questions';
  message = this.SHOW_MESSAGE;
  private prefferedQuestionsInterval: any;
  private loadTimer: any;

  display = 'none';
  private displayMode = { hidden: 'none', show: 'block' };

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.questionSubscription$ = this.store
      .select('quiz')
      .subscribe(
        ({ preferedQuestions }) => (this.preferedQuestions = preferedQuestions)
      );
  }

  ngOnDestroy = (): void => this.questionSubscription$?.unsubscribe();

  wasSelected = (question: Radical): boolean =>
    this.preferedQuestions.some((q) => q.characters === question.characters);

  onShowPrefferedQuestions(): void {
    this.isToggled = !this.isToggled;
    clearTimeout(this.loadTimer);
    clearTimeout(this.prefferedQuestionsInterval);

    if (this.isToggled) {
      this.message = this.HIDE_MESSAGE;
      this.toggleState = this.REVEALED_STATE;
      this.loadTimer = setTimeout(
        () => this.loadPrefferedQuestions(),
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
  private loadPrefferedQuestions(): void {
    let index = 0;
    this.loadedQuestions = [];
    clearInterval(this.prefferedQuestionsInterval);

    this.prefferedQuestionsInterval = setInterval(() => {
      if (index < this.chosenQuestions.length) {
        this.loadedQuestions.push(this.chosenQuestions[index]);
        index++;
      } else {
        clearInterval(this.prefferedQuestionsInterval);
      }
    }, this.ELEMENTS_DELAY);
  }

  onChangeCategory(chosenCategory: CharacterType): void {
    this.chosenCategory = chosenCategory;
    this.chosenQuestions = this.questionsByType[this.chosenCategory];
    this.loadPrefferedQuestions();
  }

  // TODO: REFACTOR with JapaneseAlphabetComponent (move to directive)
  onWindowHidden(): void {
    this.display = this.isToggled
      ? this.displayMode.show
      : this.displayMode.hidden;
  }
}
