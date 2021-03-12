import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RadicalCardComponent } from './radical_card/radical_card.component';
import RadicalEffects from './store/radical.effects';
import { radicalReducer } from './store/radical.reducer';

@NgModule({
  declarations: [RadicalCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('radical', radicalReducer),
    EffectsModule.forFeature([RadicalEffects]),
  ],
  exports: [RadicalCardComponent],
})
export default class RadicalModule {}
