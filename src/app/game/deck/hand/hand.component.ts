import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GameCard from '../models/game-card.model';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css'],
})
export class HandComponent implements OnInit, OnDestroy {
  private handSubscription$: Subscription;
  hand: GameCard[];

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.handSubscription$ = this.store
      .select('deck')
      .subscribe((deckState) => {
        if (deckState?.hand) {
          this.hand = deckState.hand;
        }
      });
  }

  ngOnDestroy(): void {
    this.handSubscription$?.unsubscribe();
  }
}