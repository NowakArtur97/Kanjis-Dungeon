import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharacterModule } from '../character/character.module';
import { EnemiesLayoutComponent } from './enemies-layout/enemies-layout.component';

@NgModule({
  declarations: [EnemiesLayoutComponent],
  imports: [CommonModule, CharacterModule],
  exports: [EnemiesLayoutComponent],
})
export class EnemyModule {}
