import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import CardModule from './card/card.module';
import { AppCommonModule } from './common/app-common.module';
import KanjiModule from './kanji/kanji.module';
import RadicalModule from './radical/radical.module';
import VocabularyModule from './vocabulary/vocabulary.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),

    AppCommonModule,
    CardModule,
    RadicalModule,
    KanjiModule,
    VocabularyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
