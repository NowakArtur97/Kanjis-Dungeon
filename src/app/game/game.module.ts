import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CharacterModule } from './character/character.module';
import { DeckModule } from './deck/deck.module';
import { EnemyModule } from './enemy/enemy.module';
import { GameLayoutComponent } from './game-layout/game-layout.component';
import { PlayerModule } from './player/player.module';
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

    DeckModule,
    CharacterModule,
    EnemyModule,
    PlayerModule,
  ],
  exports: [GameLayoutComponent],
})
export class GameModule {}
