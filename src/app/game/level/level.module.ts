import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import KanjiResolver from 'src/app/japanese/kanji/kanji.resolver';
import RadicalResolver from 'src/app/japanese/radical/radical.resolver';
import VocabularyResolver from 'src/app/japanese/vocabulary/vocabulary.resolver';

import { LevelMenuComponent } from './level-menu/level-menu.component';

const levelRoutes: Routes = [
  {
    path: 'level-menu',
    component: LevelMenuComponent,
    resolve: [RadicalResolver, KanjiResolver, VocabularyResolver],
  },
];

@NgModule({
  declarations: [LevelMenuComponent],
  imports: [CommonModule, RouterModule.forRoot(levelRoutes)],
  exports: [LevelMenuComponent],
})
export class LevelModule {}
