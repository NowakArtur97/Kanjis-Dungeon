import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CharacterUtil from 'src/app/common/utils/character.util';
import CommonValidators from 'src/app/common/validators/common.validator';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit, OnDestroy {
  private characterSubscription$ = new Subscription();
  private currentCharacter: Radical;
  charactersValue: string;
  quizFormGroup: FormGroup;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.characterSubscription$.add(
      this.store.select('quiz').subscribe(({ questions }) => {
        if (questions.length > 0) {
          this.currentCharacter = questions[0];
          this.charactersValue = this.currentCharacter.characters;
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

    if (this.currentCharacter) {
      characters = this.currentCharacter.characters;
      meanings = this.currentCharacter.meanings[0];

      if (CharacterUtil.isKanji(this.currentCharacter)) {
        onyomi = this.currentCharacter.onyomi || [''];
        kunyomi = this.currentCharacter.kunyomi || [''];
        nanori = this.currentCharacter.nanori || [''];
      } else if (CharacterUtil.isVocabulary(this.currentCharacter)) {
        reading = this.currentCharacter.reading;
      }
    }

    this.quizFormGroup = new FormGroup({
      characters: new FormControl(characters, [CommonValidators.notBlank]),
      meaning: new FormControl(meanings, [CommonValidators.notBlank]),
      onyomi: new FormControl(onyomi[0], [CommonValidators.notBlank]),
      kunyomi: new FormControl(kunyomi[0], [CommonValidators.notBlank]),
      nanori: new FormControl(nanori[0], [CommonValidators.notBlank]),
      reading: new FormControl(reading, [CommonValidators.notBlank]),
    });
  }

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

  onValidateCard(): void {
    console.log('HELLO');
  }

  isKanji = (): boolean => CharacterUtil.isKanji(this.currentCharacter);

  isVocabulary = (): boolean =>
    CharacterUtil.isVocabulary(this.currentCharacter);
}
