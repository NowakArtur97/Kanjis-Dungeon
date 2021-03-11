import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardWrapperComponent } from './card-wrapper/card-wrapper.component';
import { CardRadicalComponent } from './card-radical/card-radical.component';

@NgModule({
  declarations: [CardWrapperComponent, CardRadicalComponent],
  imports: [CommonModule],
  exports: [CardWrapperComponent],
})
export default class CardModule {}
