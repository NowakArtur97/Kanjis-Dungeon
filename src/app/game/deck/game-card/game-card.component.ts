import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

import GameCard from '../models/game-card.model';
import * as DeckActions from '../store/deck.actions';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() card: GameCard;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {}

  onChooseCard(): void {
    this.store.dispatch(DeckActions.chooseCard({ chosenCard: this.card }));
  }
}
