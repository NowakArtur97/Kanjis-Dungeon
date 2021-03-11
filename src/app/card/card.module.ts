import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CardRadicalComponent } from './card-radical/card-radical.component';
import { CardWrapperComponent } from './card-wrapper/card-wrapper.component';

@NgModule({
  declarations: [CardWrapperComponent, CardRadicalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CardWrapperComponent],
})
export default class CardModule {}
