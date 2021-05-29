import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { QuizModule } from '../quiz/quiz.module';
import { CharacterModule } from './character/character.module';
import { DeckModule } from './deck/deck.module';
import { EnemyModule } from './enemy/enemy.module';
import { GameLayoutComponent } from './game-layout/game-layout.component';
import { PlayerModule } from './player/player.module';
import GameEffects from './store/game.effects';
import { gameReducer } from './store/game.reducer';

const gameRoutes: Routes = [
  {
    path: 'game',
    component: GameLayoutComponent,
  },
];

@NgModule({
  declarations: [GameLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(gameRoutes),
    StoreModule.forFeature('game', gameReducer),
    EffectsModule.forFeature([GameEffects]),

    DeckModule,
    CharacterModule,
    EnemyModule,
    PlayerModule,
    QuizModule,
  ],
  exports: [GameLayoutComponent],
})
export class GameModule {}
