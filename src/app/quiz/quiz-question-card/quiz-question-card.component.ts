import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import COLORS from 'src/app/common/color.data';
import CharacterUtil from 'src/app/common/utils/character.util';
import CssUtil from 'src/app/common/utils/css.util';
import CommonValidators from 'src/app/common/validators/common.validator';
import Radical from 'src/app/japanese/radical/models/radical.model';
import QuizCard from 'src/app/quiz/models/quiz-card.model';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import { initialState } from '../../quiz/store/quiz.reducer';
import QuizOptions from '../models/quiz-options.model';
import QuizService from '../services/quiz.service';

enum CardStatus {
  CHECK,
  WRONG,
  CORRECT,
}

@Component({
  selector: 'app-quiz-question-card',
  templateUrl: './quiz-question-card.component.html',
  styleUrls: ['./quiz-question-card.component.css'],
})
export class QuizQuestionCardComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('meaningInput') meaningInputElement: ElementRef;
  private nextQuestionSubscription$: Subscription;
  private currentCharacter: Radical;
  private quizOptions: QuizOptions;
  cardStatus = CardStatus.CHECK;
  charactersValue: QuizCard;
  quizFormGroup: FormGroup;
  CardStatus = CardStatus;

  constructor(
    private store: Store<AppStoreState>,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.charactersValue = this.quizService.choosePropertiesForQuestion(
      this.currentCharacter,
      initialState.quizOptions
    );
    this.nextQuestionSubscription$ = this.store
      .select('quiz')
      .subscribe(({ nextQuestion, quizOptions }) => {
        if (nextQuestion) {
          this.currentCharacter = nextQuestion;
        }
        this.quizOptions = quizOptions;
        this.charactersValue = this.quizService.choosePropertiesForQuestion(
          this.currentCharacter,
          this.quizOptions
        );
        this.initForm();
      });
  }

  ngAfterViewInit = (): void => this.meaningInputElement.nativeElement.focus();

  ngOnDestroy = (): void => this.nextQuestionSubscription$?.unsubscribe();

  private initForm(): void {
    let cardColor = COLORS.radical;

    if (this.currentCharacter?.id) {
      if (CharacterUtil.isKanji(this.currentCharacter)) {
        cardColor = COLORS.kanji;
      } else if (CharacterUtil.isVocabulary(this.currentCharacter)) {
        cardColor = COLORS.vocabulary;
      }

      CssUtil.changeQuizCardColor(cardColor);
    }

    this.quizFormGroup = new FormGroup({
      characters: new FormControl(this.charactersValue.characters, [
        CommonValidators.equals(
          this.currentCharacter?.characters &&
            this.currentCharacter.characters !== ''
            ? this.currentCharacter.characters
            : ''
        ),
      ]),
      meaning: new FormControl(
        this.charactersValue.meanings,
        this.currentCharacter?.meanings &&
        this.currentCharacter.meanings !== ['']
          ? [CommonValidators.includes(this.currentCharacter.meanings)]
          : []
      ),
      onyomi: new FormControl(
        this.charactersValue.onyomi ? this.charactersValue.onyomi : '',
        CharacterUtil.isKanji(this.currentCharacter) &&
        this.currentCharacter?.onyomi &&
        this.currentCharacter.onyomi !== ['']
          ? [CommonValidators.includes(this.currentCharacter.onyomi)]
          : []
      ),
      kunyomi: new FormControl(
        this.charactersValue.kunyomi ? this.charactersValue.kunyomi : '',
        CharacterUtil.isKanji(this.currentCharacter) &&
        this.currentCharacter?.kunyomi &&
        this.currentCharacter.kunyomi !== ['']
          ? [CommonValidators.includes(this.currentCharacter.kunyomi)]
          : []
      ),
      nanori: new FormControl(
        this.charactersValue.nanori ? this.charactersValue.nanori : '',
        CharacterUtil.isKanji(this.currentCharacter) &&
        this.currentCharacter?.nanori &&
        this.currentCharacter.nanori !== ['']
          ? [CommonValidators.includes(this.currentCharacter.nanori)]
          : []
      ),
      reading: new FormControl(
        this.charactersValue.reading ? this.charactersValue.reading : '',
        CharacterUtil.isVocabulary(this.currentCharacter) &&
        this.currentCharacter?.reading &&
        this.currentCharacter.reading !== ''
          ? [CommonValidators.equals(this.currentCharacter.reading)]
          : []
      ),
    });
  }

  onValidateCard(): void {
    if (this.cardStatus !== CardStatus.CHECK) {
      this.confirmAnswer();
      this.meaningInputElement.nativeElement.focus();
      return;
    }

    this.cardStatus = this.quizFormGroup.invalid
      ? CardStatus.WRONG
      : CardStatus.CORRECT;

    if (this.quizOptions.shouldShowAnswer) {
      this.charactersValue = { ...this.currentCharacter };
      this.initForm();
    }
    CssUtil.changeQuizCardColor(
      this.cardStatus === CardStatus.CORRECT ? COLORS.correct : COLORS.wrong
    );
  }

  private confirmAnswer(): void {
    this.store.dispatch(
      this.cardStatus === CardStatus.CORRECT
        ? QuizActions.addAnswer({ answer: this.currentCharacter })
        : QuizActions.addMistake({ mistake: this.currentCharacter })
    );
    this.cardStatus = CardStatus.CHECK;
  }

  isKanji = (): boolean => CharacterUtil.isKanji(this.currentCharacter);

  isVocabulary = (): boolean =>
    CharacterUtil.isVocabulary(this.currentCharacter);

  hasProperty = (property: string) =>
    this.currentCharacter[property] !== undefined;
}
