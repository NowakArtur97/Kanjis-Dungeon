import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GameCard from '../models/game-card.model';
import * as DeckActions from '../store/deck.actions';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit, OnDestroy {
  @Input() card: GameCard;
  private deckEnergySubscription$: Subscription;
  isAvailable: boolean;
  isChosen: boolean;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.deckEnergySubscription$ = this.store
      .select('deck')
      .subscribe((deckState) => {
        if (deckState) {
          this.isAvailable = deckState.remainingEnergy >= this.card.cost;
          this.isChosen = deckState.chosenCard?.id === this.card.id;
        }
      });
  }

  ngOnDestroy(): void {
    this.deckEnergySubscription$?.unsubscribe();
  }

  onChooseCard(): void {
    if (this.isAvailable) {
      this.store.dispatch(DeckActions.chooseCard({ chosenCard: this.card }));
    }
  }
}
