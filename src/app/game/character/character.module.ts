import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  imports: [CommonModule, BrowserAnimationsModule, UIModule],
  exports: [CharacterLayoutComponent],
})
export class CharacterModule {}
