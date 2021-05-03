import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CharacterModule } from '../character/character.module';
import { EnemiesLayoutComponent } from './enemies-layout/enemies-layout.component';
import EnemyEffects from './store/enemy.effects';
import { enemyReducer } from './store/enemy.reducer';

@NgModule({
  declarations: [EnemiesLayoutComponent],
  imports: [
    CommonModule,

    CharacterModule,
    StoreModule.forFeature('enemy', enemyReducer),
    EffectsModule.forFeature([EnemyEffects]),
  ],
  exports: [EnemiesLayoutComponent],
})
export class EnemyModule {}
