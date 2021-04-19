import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UIModule } from '../ui/ui.module';
import { CharacterLayoutComponent } from './character-layout/character-layout.component';
import { CharacterSpriteComponent } from './character-sprite/character-sprite.component';
import { CharacterStatsComponent } from './character-stats/character-stats.component';

@NgModule({
  declarations: [
    CharacterLayoutComponent,
    CharacterSpriteComponent,
    CharacterStatsComponent,
  ],
  imports: [CommonModule, UIModule],
  exports: [CharacterLayoutComponent],
})
export class CharacterModule {}
