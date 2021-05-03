import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CharacterModule } from '../character/character.module';
import { EnemiesLayoutComponent } from './enemies-layout/enemies-layout.component';
import { enemyReducer } from './store/enemy.reducer';

@NgModule({
  declarations: [EnemiesLayoutComponent],
  imports: [
    CommonModule,

    CharacterModule,
    StoreModule.forFeature('enemy', enemyReducer),
  ],
  exports: [EnemiesLayoutComponent],
})
export class EnemyModule {}
