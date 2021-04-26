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
    },
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 60,
        currentHealth: 30,
        maxDamage: 12,
        damage: 10,
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
    },
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 50,
        currentHealth: 30,
        damage: 10,
        maxDamage: 12,
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
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
