import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../common/app-common.module';
import KanjiEffects from '../kanji/store/kanji.effects';
import { kanjiReducer } from '../kanji/store/kanji.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature('kanji', kanjiReducer),
    EffectsModule.forFeature([KanjiEffects]),

    AppCommonModule,
  ],
  exports: [],
})
export default class KanjiModule {}
