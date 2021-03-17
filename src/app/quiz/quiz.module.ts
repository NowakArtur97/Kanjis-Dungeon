import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { quizReducer } from './store/quiz.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('quiz', quizReducer)],
})
export class QuizModule {}
