import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from '../common/app-common.module';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

@NgModule({
  declarations: [QuizCardComponent],
  imports: [CommonModule, ReactiveFormsModule, AppCommonModule],
  exports: [QuizCardComponent],
})
export default class CardModule {}
