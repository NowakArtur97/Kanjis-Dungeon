import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../common/app-common.module';
import KanjiResolver from '../kanji/kanji.resolver';
import RadicalResolver from '../radical/radical.resolver';
import VocabularyResolver from '../vocabulary/vocabulary.resolver';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import QuizEffects from './store/quiz.effects';
import { quizReducer } from './store/quiz.reducer';

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
    StoreModule.forFeature('quiz', quizReducer),
    EffectsModule.forFeature([QuizEffects]),
    ReactiveFormsModule,
    RouterModule.forRoot(cardRoutes),

    AppCommonModule,
  ],
  exports: [QuizCardComponent],
})
export class QuizModule {}
