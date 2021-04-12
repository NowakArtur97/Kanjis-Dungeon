import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameCardComponent } from './game-card/game-card.component';
import { HandComponent } from './hand/hand.component';

@NgModule({
  declarations: [HandComponent, GameCardComponent],
  imports: [CommonModule],
  exports: [HandComponent],
})
export class DeckModule {}
