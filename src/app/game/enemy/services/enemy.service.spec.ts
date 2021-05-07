import { getTestBed, TestBed } from '@angular/core/testing';

import CharacterType from '../../character/enums/character-type.enum';
import Character from '../../character/models/character.model';
import GameCardType from '../../deck/enums/game-card-type.enum';
import GameCard from '../../deck/models/game-card.model';
import EnemyService from './enemy.service';

describe('enemyService', () => {
  let injector: TestBed;
  let enemyService: EnemyService;
  const enemy1: Character = {
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
  };
  const enemy2: Character = {
    name: 'goblin-archer',
    stats: {
      maxHealth: 60,
      currentHealth: 15,
      maxDamage: 12,
      damage: 10,
      currentShield: 8,
      type: CharacterType.ENEMY,
    },
    animations: [...enemy1.animations],
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
  };
  const enemy3: Character = {
    name: 'goblin-archer',
    stats: {
      maxHealth: 50,
      currentHealth: 20,
      damage: 10,
      maxDamage: 12,
      currentShield: 2,
      type: CharacterType.ENEMY,
    },
    animations: [...enemy1.animations],
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
  };
  const enemies: Character[] = [enemy1, enemy2, enemy3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [EnemyService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    enemyService = injector.inject(EnemyService);
  });

  describe('when update enemies', () => {
    it('should return updated enemis', () => {
      const updatedEnemy1 = {
        ...enemy1,
        stats: {
          ...enemy1.stats,
          currentHealth: enemy1.stats.currentHealth - 10,
        },
      };
      const updatedEnemiesExpected: Character[] = [
        updatedEnemy1,
        enemy2,
        enemy3,
      ];
      const attackCard: GameCard = {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'Deal 10 damage points',
        apply(character: Character): void {
          character.stats.currentHealth -= 10;
        },
      };
      const updatedEnemiesActual = enemyService.updateEnemies(
        attackCard,
        enemy1,
        enemies
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(updatedEnemy1);
      expect(updatedEnemiesActual.length).toBe(updatedEnemiesExpected.length);
    });
  });
});
