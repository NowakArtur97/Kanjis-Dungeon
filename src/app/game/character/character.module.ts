import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharacterLayoutComponent } from './character-layout/character-layout.component';
import { CharacterSpriteComponent } from './character-sprite/character-sprite.component';
import { CharacterStatsComponent } from './character-stats/character-stats.component';

@NgModule({
  declarations: [
    CharacterLayoutComponent,
    CharacterSpriteComponent,
    CharacterStatsComponent,
  ],
  imports: [CommonModule],
  exports: [CharacterLayoutComponent],
})
export class CharacterModule {}
