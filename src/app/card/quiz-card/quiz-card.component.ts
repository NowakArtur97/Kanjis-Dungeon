import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CommonValidators from 'src/app/common/validators/common.validator';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit, OnDestroy {
  private characterSubscription$: Subscription;
  private currentCharacter: Radical;
  charactersValue: string;
  quizFormGroup: FormGroup;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.characterSubscription$ = this.store
      .select('radical')
      .subscribe(({ radicals }) => {
        this.currentCharacter = radicals[0];
        this.charactersValue = this.currentCharacter.characters;
      });

    this.initForm();
  }

  ngOnDestroy(): void {
    this.characterSubscription$?.unsubscribe();
  }

  private initForm(): void {
    this.quizFormGroup = new FormGroup({
      characters: new FormControl(this.currentCharacter.characters, [
        CommonValidators.notBlank,
      ]),
      meaning: new FormControl(this.currentCharacter.meanings[0], [
        CommonValidators.notBlank,
      ]),
    });
  }

  get character(): AbstractControl {
    return this.quizFormGroup.get('characters');
  }

  get meaning(): AbstractControl {
    return this.quizFormGroup.get('meaning');
  }

  onValidateCard(): void {
    console.log('HELLO');
  }
}
