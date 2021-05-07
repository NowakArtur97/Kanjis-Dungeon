import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CharacterModule } from '../character/character.module';
import { PlayerLayoutComponent } from './player-layout/player-layout.component';
import PlayerEffects from './store/player.effects';
import { playerReducer } from './store/player.reducer';

@NgModule({
  declarations: [PlayerLayoutComponent],
  imports: [
    CommonModule,

    CharacterModule,
    StoreModule.forFeature('player', playerReducer),
    EffectsModule.forFeature([PlayerEffects]),
  ],
  exports: [PlayerLayoutComponent],
})
export class PlayerModule {}
