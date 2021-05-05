import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GameCardComponent } from './game-card/game-card.component';
import { HandComponent } from './hand/hand.component';
import DeckEffects from './store/deck.effects';
import { deckReducer } from './store/deck.reducer';

@NgModule({
  declarations: [HandComponent, GameCardComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('deck', deckReducer),
    EffectsModule.forFeature([DeckEffects]),
  ],
  exports: [HandComponent],
})
export class DeckModule {}
