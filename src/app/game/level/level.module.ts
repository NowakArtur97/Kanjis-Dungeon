import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import KanjiResolver from 'src/app/japanese/kanji/kanji.resolver';
import RadicalResolver from 'src/app/japanese/radical/radical.resolver';
import VocabularyResolver from 'src/app/japanese/vocabulary/vocabulary.resolver';

import { LevelMenuComponent } from './level-menu/level-menu.component';
import LevelEffects from './store/level.effects';
import { levelReducer } from './store/level.reducer';

const levelRoutes: Routes = [
  {
    path: 'levels',
    component: LevelMenuComponent,
    resolve: [RadicalResolver, KanjiResolver, VocabularyResolver],
  },
];

@NgModule({
  declarations: [LevelMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(levelRoutes),
    StoreModule.forFeature('level', levelReducer),
    EffectsModule.forFeature([LevelEffects]),
  ],
  exports: [LevelMenuComponent],
})
export class LevelModule {}
