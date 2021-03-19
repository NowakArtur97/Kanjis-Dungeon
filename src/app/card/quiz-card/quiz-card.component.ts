import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CharacterUtil from 'src/app/common/utils/character.util';
import CommonValidators from 'src/app/common/validators/common.validator';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../quiz/store/quiz.actions';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit, OnDestroy {
  private characterSubscription$ = new Subscription();
  private currentCharacter: Radical;
  private cardColors = {
    radical: '#08c',
    kanji: '#f0a',
    vocabulary: '#a0f',
    error: '#f03',
  };
  charactersValue: string;
  quizFormGroup: FormGroup;
  answerIsWrong = false;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.characterSubscription$.add(
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
    this.characterSubscription$?.unsubscribe();
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

      if (!this.answerIsWrong) {
        this.changeCardColor(cardColor);
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
    if (this.answerIsWrong) {
      this.answerIsWrong = false;
      return;
    }

    if (this.quizFormGroup.invalid) {
      this.changeCardColor(this.cardColors.error);
      this.answerIsWrong = true;
      this.quizFormGroup.updateValueAndValidity();
      this.store.dispatch(
        QuizActions.addMistake({ mistake: this.currentCharacter })
      );
    } else {
      this.store.dispatch(
        QuizActions.addAnswer({ answer: this.currentCharacter })
      );
    }
  }

  isKanji = (): boolean => CharacterUtil.isKanji(this.currentCharacter);

  isVocabulary = (): boolean =>
    CharacterUtil.isVocabulary(this.currentCharacter);

  private changeCardColor = (color: string): void =>
    document.documentElement.style.setProperty('--main-card-color', color);

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
