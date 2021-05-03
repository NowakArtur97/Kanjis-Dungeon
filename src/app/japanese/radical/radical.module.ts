import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import RadicalEffects from './store/radical.effects';
import { radicalReducer } from './store/radical.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('radical', radicalReducer),
    EffectsModule.forFeature([RadicalEffects]),
  ],
})
export default class RadicalModule {}
