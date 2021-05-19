import { getTestBed, TestBed } from '@angular/core/testing';

import Character from '../../character/models/character.model';
import GameCardType from '../../deck/enums/game-card-type.enum';
import GameCard from '../../deck/models/game-card.model';
import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../enemy.data';
import EnemyService from './enemy.service';

describe('enemyService', () => {
  let injector: TestBed;
  let enemyService: EnemyService;

  const enemies: Character[] = [exampleEnemy1, exampleEnemy2, exampleEnemy3];

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
        ...exampleEnemy1,
        stats: {
          ...exampleEnemy1.stats,
          currentHealth: exampleEnemy1.stats.currentHealth - 10,
        },
      };
      const updatedEnemiesExpected: Character[] = [
        updatedEnemy1,
        exampleEnemy2,
        exampleEnemy3,
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
        exampleEnemy1,
        enemies
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(updatedEnemy1);
      expect(updatedEnemiesActual.length).toBe(updatedEnemiesExpected.length);
    });
  });
});
