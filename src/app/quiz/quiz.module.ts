import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../common/app-common.module';
import { JapaneseModule } from '../japanese/japanese.module';
import KanjiResolver from '../japanese/kanji/kanji.resolver';
import RadicalResolver from '../japanese/radical/radical.resolver';
import VocabularyResolver from '../japanese/vocabulary/vocabulary.resolver';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizLayoutComponent } from './quiz-layout/quiz-layout.component';
import { QuizOptionsComponent } from './quiz-options/quiz-options.component';
import QuizEffects from './store/quiz.effects';
import { quizReducer } from './store/quiz.reducer';

const cardRoutes: Routes = [
  {
    path: 'quiz',
    component: QuizLayoutComponent,
    resolve: [RadicalResolver, KanjiResolver, VocabularyResolver],
  },
];

@NgModule({
  declarations: [QuizLayoutComponent, QuizCardComponent, QuizOptionsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('quiz', quizReducer),
    EffectsModule.forFeature([QuizEffects]),
    ReactiveFormsModule,
    RouterModule.forRoot(cardRoutes),

    JapaneseModule,
    AppCommonModule,
  ],
  exports: [QuizLayoutComponent],
})
export class QuizModule {}
