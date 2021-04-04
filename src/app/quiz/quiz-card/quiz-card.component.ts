import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import CharacterUtil from 'src/app/common/utils/character.util';
import CssUtil from 'src/app/common/utils/css.util';
import CommonValidators from 'src/app/common/validators/common.validator';
import QuizCard from 'src/app/quiz/models/quiz-card.model';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';
import { initialState } from '../../quiz/store/quiz.reducer';
import QuizService from '../services/quiz.service';

enum CardStatus {
  CHECK,
  WRONG,
  CORRECT,
}

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit, OnDestroy {
  private nextQuestionSubscription$;
  private currentCharacter: Radical;
  private cardColors = {
    radical: '#08c',
    kanji: '#f0a',
    vocabulary: '#a0f',
    correct: '#08c66c',
    wrong: '#f03',
  };
  answerConfirmed = false;
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
        this.charactersValue = this.quizService.choosePropertiesForQuestion(
          this.currentCharacter,
          quizOptions
        );
        this.initForm();
      });
  }

  ngOnDestroy(): void {
    this.nextQuestionSubscription$?.unsubscribe();
  }

  private initForm(): void {
    let cardColor = this.cardColors.radical;

    if (this.currentCharacter?.id) {
      if (CharacterUtil.isKanji(this.currentCharacter)) {
        cardColor = this.cardColors.kanji;
      } else if (CharacterUtil.isVocabulary(this.currentCharacter)) {
        cardColor = this.cardColors.vocabulary;
      }

      CssUtil.changeQuizCardColor(cardColor);
    }

    this.quizFormGroup = new FormGroup({
      characters: new FormControl(this.charactersValue.characters, [
        CommonValidators.equals(
          this.currentCharacter ? this.currentCharacter.characters : ''
        ),
      ]),
      meaning: new FormControl(
        this.charactersValue.meanings[0],
        this.currentCharacter
          ? [CommonValidators.includes(this.currentCharacter.meanings)]
          : []
      ),
      onyomi: new FormControl(
        this.charactersValue.onyomi ? this.charactersValue.onyomi[0] : '',
        CharacterUtil.isKanji(this.currentCharacter) &&
        this.currentCharacter.onyomi
          ? [CommonValidators.includes(this.currentCharacter.onyomi)]
          : []
      ),
      kunyomi: new FormControl(
        this.charactersValue.kunyomi ? this.charactersValue.kunyomi[0] : '',
        CharacterUtil.isKanji(this.currentCharacter) &&
        this.currentCharacter.kunyomi
          ? [CommonValidators.includes(this.currentCharacter.kunyomi)]
          : []
      ),
      nanori: new FormControl(
        this.charactersValue.nanori ? this.charactersValue.nanori[0] : '',
        CharacterUtil.isKanji(this.currentCharacter) &&
        this.currentCharacter.nanori
          ? [CommonValidators.includes(this.currentCharacter.nanori)]
          : []
      ),
      reading: new FormControl(
        this.charactersValue.reading ? this.charactersValue.reading : '',
        CharacterUtil.isVocabulary(this.currentCharacter)
          ? [CommonValidators.equals(this.currentCharacter.reading)]
          : []
      ),
    });
  }

  onValidateCard(): void {
    if (this.cardStatus !== CardStatus.CHECK) {
      this.confirmAnswer();
      return;
    }

    if (this.quizFormGroup.invalid) {
      this.quizFormGroup.updateValueAndValidity();
      this.cardStatus = CardStatus.WRONG;
      this.answerConfirmed = false;
    } else {
      this.cardStatus = CardStatus.CORRECT;
    }
    // TODO: Check if should display correct answer
    this.charactersValue = { ...this.currentCharacter };
    this.initForm();
    //
    CssUtil.changeQuizCardColor(
      this.cardStatus === CardStatus.CORRECT
        ? this.cardColors.correct
        : this.cardColors.wrong
    );
  }

  private confirmAnswer(): void {
    this.answerConfirmed = true;
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
