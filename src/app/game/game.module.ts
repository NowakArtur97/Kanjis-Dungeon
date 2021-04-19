import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterModule } from './character/character.module';
import { DeckModule } from './deck/deck.module';
import { EnemyModule } from './enemy/enemy.module';
import { GameLayoutComponent } from './game-layout/game-layout.component';

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
    DeckModule,
    CharacterModule,
    EnemyModule,
  ],
  exports: [GameLayoutComponent],
})
export class GameModule {}
