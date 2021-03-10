import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardLayoutComponent } from './card/card-layout/card-layout.component';

@NgModule({
  declarations: [AppComponent, CardLayoutComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
