import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Radical from 'src/app/radical/models/radical.model';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-card-radical',
  templateUrl: './card-radical.component.html',
  styleUrls: ['./card-radical.component.css'],
})
export class CardRadicalComponent implements OnInit, OnDestroy {
  private radicalSubscription$: Subscription;
  currentRadical: Radical;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.radicalSubscription$ = this.store
      .select('radical')
      .subscribe(({ radicals }) => (this.currentRadical = radicals[0]));
  }

  ngOnDestroy(): void {
    this.radicalSubscription$?.unsubscribe();
  }
}
