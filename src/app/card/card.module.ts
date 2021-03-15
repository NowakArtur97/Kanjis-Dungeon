import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../common/app-common.module';
import KanjiResolver from '../kanji/kanji.resolver';
import RadicalResolver from '../radical/radical.resolver';
import VocabularyResolver from '../vocabulary/vocabulary.resolver';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

const cardRoutes: Routes = [
  {
    path: 'quiz',
    component: QuizCardComponent,
    resolve: [RadicalResolver, KanjiResolver, VocabularyResolver],
  },
];

@NgModule({
  declarations: [QuizCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(cardRoutes),

    AppCommonModule,
  ],
  exports: [QuizCardComponent],
})
export default class CardModule {}
