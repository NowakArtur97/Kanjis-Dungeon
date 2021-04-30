import { Component, OnInit } from '@angular/core';

import Character from '../../character/models/character.model';

@Component({
  selector: 'app-player-layout',
  templateUrl: './player-layout.component.html',
  styleUrls: ['./player-layout.component.css'],
})
export class PlayerLayoutComponent implements OnInit {
  // TODO: PlayerLayoutComponent: Get Player from store
  player: Character = {
    name: 'example-character',
    stats: {
      currentHealth: 100,
      maxHealth: 100,
      damage: 20,
      maxDamage: 22,
      currentShield: 10,
      isEnemy: false,
    },
    animations: [
      {
        spriteSheet: 'idle',
        numberOfFrames: 4,
        animationTimeInMiliseconds: 600,
        animationIterationCount: 'Infinite',
      },
    ],
    statuses: [
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
