import { Injectable } from '@angular/core';

import CharacterType from '../../character/enums/character-type.enum';
import Character from '../../character/models/character.model';

@Injectable({ providedIn: 'root' })
export default class EnemyService {
  // TODO: EnemyService: Get random enemies
  chooseEnemies(level: number): Character[] {
    return [
      {
        name: 'goblin-archer',
        stats: {
          maxHealth: 70,
          currentHealth: 70,
          maxDamage: 12,
          damage: 10,
          currentShield: 0,
          type: CharacterType.ENEMY,
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
            spriteSheet: 'book',
            remainingNumberOfActiveRounds: 3,
          },
        ],
        action: {
          action: 'sword',
          value: 5,
        },
      },
      {
        name: 'goblin-archer',
        stats: {
          maxHealth: 60,
          currentHealth: 15,
          maxDamage: 12,
          damage: 10,
          currentShield: 8,
          type: CharacterType.ENEMY,
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
        ],
        action: {
          action: 'sword',
          value: 5,
        },
      },
      {
        name: 'goblin-archer',
        stats: {
          maxHealth: 50,
          currentHealth: 20,
          damage: 10,
          maxDamage: 12,
          currentShield: 2,
          type: CharacterType.ENEMY,
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
        ],
        action: {
          action: 'shield',
          value: 11,
        },
      },
    ];
  }
}
