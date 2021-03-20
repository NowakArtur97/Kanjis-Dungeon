import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CharacterUtil from 'src/app/common/utils/character.util';
import CssUtil from 'src/app/common/utils/css.util';
import CommonValidators from 'src/app/common/validators/common.validator';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';

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
  private nextQuestionSubscription$ = new Subscription();
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
  charactersValue: string;
  quizFormGroup: FormGroup;
  CardStatus = CardStatus;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.nextQuestionSubscription$.add(
      this.store.select('quiz').subscribe(({ nextQuestion }) => {
        if (nextQuestion) {
          this.currentCharacter = nextQuestion;
          this.charactersValue = nextQuestion.characters;
        }
        this.initForm();
      })
    );
  }

  ngOnDestroy(): void {
    this.nextQuestionSubscription$?.unsubscribe();
  }

  private initForm(): void {
    let characters = '';
    let meanings = '';
    let onyomi = [''];
    let kunyomi = [''];
    let nanori = [''];
    let reading = '';
    let cardColor = this.cardColors.radical;

    if (this.currentCharacter?.id) {
      characters = this.currentCharacter.characters;
      meanings = this.currentCharacter.meanings[0];

      if (CharacterUtil.isKanji(this.currentCharacter)) {
        onyomi = this.currentCharacter.onyomi || [''];
        kunyomi = this.currentCharacter.kunyomi || [''];
        nanori = this.currentCharacter.nanori || [''];
        cardColor = this.cardColors.kanji;
      } else if (CharacterUtil.isVocabulary(this.currentCharacter)) {
        reading = this.currentCharacter.reading;
        cardColor = this.cardColors.vocabulary;
      }

      if (this.answerConfirmed) {
        CssUtil.changeQuizCardColor(cardColor);
      }
    }

    this.quizFormGroup = new FormGroup({
      characters: new FormControl(characters, [CommonValidators.notBlank]),
      meaning: new FormControl(meanings, [CommonValidators.notBlank]),
      onyomi: new FormControl(onyomi[0], []),
      kunyomi: new FormControl(kunyomi[0], []),
      nanori: new FormControl(nanori[0], []),
      reading: new FormControl(reading, []),
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

  get character(): AbstractControl {
    return this.quizFormGroup.get('characters');
  }

  get meaning(): AbstractControl {
    return this.quizFormGroup.get('meaning');
  }

  get reading(): AbstractControl {
    return this.quizFormGroup.get('reading');
  }

  get onyomi(): AbstractControl {
    return this.quizFormGroup.get('onyomi');
  }

  get kunyomi(): AbstractControl {
    return this.quizFormGroup.get('kunyomi');
  }

  get nanori(): AbstractControl {
    return this.quizFormGroup.get('nanori');
  }
}
