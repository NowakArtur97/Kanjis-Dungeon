import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import RadicalModule from '../radical/radical.module';
import { CardWrapperComponent } from './card-wrapper/card-wrapper.component';

@NgModule({
  declarations: [CardWrapperComponent],
  imports: [CommonModule, RadicalModule],
  exports: [CardWrapperComponent],
})
export default class CardModule {}
