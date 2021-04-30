import { Component, OnInit } from '@angular/core';

import Character from '../../character/models/character.model';

@Component({
  selector: 'app-enemies-layout',
  templateUrl: './enemies-layout.component.html',
  styleUrls: ['./enemies-layout.component.css'],
})
export class EnemiesLayoutComponent implements OnInit {
  // TODO: EnemiesLayout: Get enemies from Store
  enemies: Character[] = [
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 70,
        currentHealth: 70,
        maxDamage: 12,
        damage: 10,
        currentShield: 0,
        isEnemy: true,
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
    },
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 60,
        currentHealth: 15,
        maxDamage: 12,
        damage: 10,
        currentShield: 8,
        isEnemy: true,
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
    },
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 50,
        currentHealth: 20,
        damage: 10,
        maxDamage: 12,
        currentShield: 2,
        isEnemy: true,
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
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
