import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharacterModule } from '../character/character.module';
import { PlayerLayoutComponent } from './player-layout/player-layout.component';

@NgModule({
  declarations: [PlayerLayoutComponent],
  imports: [CommonModule, CharacterModule],
  exports: [PlayerLayoutComponent],
})
export class PlayerModule {}
