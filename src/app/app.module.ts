import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppCommonModule } from './common/app-common.module';
import { GameModule } from './game/game.module';
import KanjiModule from './kanji/kanji.module';
import { QuizModule } from './quiz/quiz.module';
import RadicalModule from './radical/radical.module';
import VocabularyModule from './vocabulary/vocabulary.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(appRoutes),

    AppCommonModule,
    RadicalModule,
    KanjiModule,
    VocabularyModule,
    QuizModule,
    GameModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
