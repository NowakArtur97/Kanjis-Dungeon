import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import QuizEffects from './store/quiz.effects';
import { quizReducer } from './store/quiz.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('quiz', quizReducer),
    EffectsModule.forFeature([QuizEffects]),
  ],
})
export class QuizModule {}
