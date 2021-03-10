import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import CardModule from './card/card.module';
import AppCommonModule from './common/common.module';
import RadicalModule from './radical/radical.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),

    AppCommonModule,
    CardModule,
    RadicalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
