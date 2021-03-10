import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CardModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
