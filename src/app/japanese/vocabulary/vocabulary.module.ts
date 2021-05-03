import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../../common/app-common.module';
import VocabularyEffects from '../vocabulary/store/vocabulary.effects';
import { vocabularyReducer } from '../vocabulary/store/vocabulary.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature('vocabulary', vocabularyReducer),
    EffectsModule.forFeature([VocabularyEffects]),

    AppCommonModule,
  ],
  exports: [],
})
export default class VocabularyModule {}
