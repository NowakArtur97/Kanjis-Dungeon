import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { GameCardComponent } from './game-card/game-card.component';
import { HandComponent } from './hand/hand.component';
import { deckReducer } from './store/deck.reducer';

@NgModule({
  declarations: [HandComponent, GameCardComponent],
  imports: [CommonModule, StoreModule.forFeature('deck', deckReducer)],
  exports: [HandComponent],
})
export class DeckModule {}
