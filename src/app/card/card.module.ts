import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardLayoutComponent } from './card-layout/card-layout.component';

@NgModule({
  declarations: [CardLayoutComponent],
  imports: [CommonModule],
  exports: [CardLayoutComponent],
})
export default class CardModule {}
