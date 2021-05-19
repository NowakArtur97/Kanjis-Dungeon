import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../../character/models/character.model';
import GameCardType from '../../deck/enums/game-card-type.enum';
import GameCard from '../../deck/models/game-card.model';
import { shieldAction, swordAction } from '../enemy-action.data';
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
    it('should return updated enemies', () => {
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

  describe('when choose random enemies actions', () => {
    it('should return enemies with actions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(1, 0, 0);

      const updatedEnemy1: Character = {
        ...exampleEnemy1,
        currentAction: shieldAction,
      };
      const updatedEnemy2: Character = {
        ...exampleEnemy2,
        currentAction: swordAction,
      };
      const updatedEnemy3: Character = {
        ...exampleEnemy3,
        currentAction: swordAction,
      };
      const updatedEnemiesExpected: Character[] = [
        updatedEnemy1,
        updatedEnemy2,
        updatedEnemy3,
      ];

      const updatedEnemiesActual = enemyService.chooseRandomEnemiesActions(
        enemies
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(updatedEnemy1);
      expect(updatedEnemiesActual).toContain(updatedEnemy2);
      expect(updatedEnemiesActual).toContain(updatedEnemy3);
      expect(updatedEnemiesActual[0].currentAction).toEqual(
        updatedEnemy1.currentAction
      );
      expect(updatedEnemiesActual[1].currentAction).toEqual(
        updatedEnemy2.currentAction
      );
      expect(updatedEnemiesActual[2].currentAction).toEqual(
        updatedEnemy3.currentAction
      );
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(3);
    });
  });
});
