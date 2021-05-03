import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CharacterModule } from '../character/character.module';
import { PlayerLayoutComponent } from './player-layout/player-layout.component';
import { playerReducer } from './store/player.reducer';

@NgModule({
  declarations: [PlayerLayoutComponent],
  imports: [
    CommonModule,

    CharacterModule,
    StoreModule.forFeature('player', playerReducer),
  ],
  exports: [PlayerLayoutComponent],
})
export class PlayerModule {}
