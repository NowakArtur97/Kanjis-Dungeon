import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import CommonValidators from 'src/app/common/validators/common.validator';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-radical-card',
  templateUrl: './radical_card.component.html',
  styleUrls: ['./radical_card.component.css'],
})
export class RadicalCardComponent implements OnInit, OnDestroy {
  private radicalSubscription$: Subscription;
  private currentRadical: Radical;
  radicalValue: string;
  radicalFormGroup: FormGroup;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.radicalSubscription$ = this.store
      .select('radical')
      .subscribe(({ radicals }) => {
        this.currentRadical = radicals[0];
        this.radicalValue = this.currentRadical.characters;
      });

    this.initForm();
  }

  ngOnDestroy(): void {
    this.radicalSubscription$?.unsubscribe();
  }

  private initForm(): void {
    this.radicalFormGroup = new FormGroup({
      radical: new FormControl(this.currentRadical.characters, [
        CommonValidators.notBlank,
      ]),
      meaning: new FormControl(this.currentRadical.meanings[0], [
        CommonValidators.notBlank,
      ]),
    });
  }

  get radical(): AbstractControl {
    return this.radicalFormGroup.get('radical');
  }

  get meaning(): AbstractControl {
    return this.radicalFormGroup.get('meaning');
  }

  onValidateCard(): void {
    console.log('HELLO');
  }
}
