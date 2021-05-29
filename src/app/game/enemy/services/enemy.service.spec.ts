import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../../character/models/character.model';
import GameCardType from '../../deck/enums/game-card-type.enum';
import GameCard from '../../deck/models/game-card.model';
import defaultPlayer from '../../player/player.data';
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
      const expectedEnemy1 = {
        ...exampleEnemy1,
        stats: {
          ...exampleEnemy1.stats,
          currentHealth: exampleEnemy1.stats.currentHealth - 10,
        },
      };
      const updatedEnemiesExpected: Character[] = [
        expectedEnemy1,
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
      expect(updatedEnemiesActual).toContain(expectedEnemy1);
      expect(updatedEnemiesActual.length).toBe(updatedEnemiesExpected.length);
    });
  });

  describe('when choose random enemies actions', () => {
    it('should return enemies with actions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(1, 0, 0);

      const expectedEnemy1: Character = {
        ...exampleEnemy1,
        currentAction: shieldAction,
      };
      const expectedEnemy2: Character = {
        ...exampleEnemy2,
        currentAction: swordAction,
      };
      const expectedEnemy3: Character = {
        ...exampleEnemy3,
        currentAction: swordAction,
      };
      const updatedEnemiesExpected: Character[] = [
        expectedEnemy1,
        expectedEnemy2,
        expectedEnemy3,
      ];

      const updatedEnemiesActual = enemyService.chooseRandomEnemiesActions(
        enemies
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(expectedEnemy1);
      expect(updatedEnemiesActual).toContain(expectedEnemy2);
      expect(updatedEnemiesActual).toContain(expectedEnemy3);
      expect(updatedEnemiesActual[0].currentAction).toEqual(
        expectedEnemy1.currentAction
      );
      expect(updatedEnemiesActual[1].currentAction).toEqual(
        expectedEnemy2.currentAction
      );
      expect(updatedEnemiesActual[2].currentAction).toEqual(
        expectedEnemy3.currentAction
      );
      expect(MathUtil.getRandomIndex).toHaveBeenCalledTimes(3);
    });
  });

  describe('when perform actions', () => {
    it('related to defence should update enemies stats', () => {
      const enemy1: Character = {
        ...exampleEnemy1,
        currentAction: shieldAction,
      };
      const enemy2: Character = {
        ...exampleEnemy2,
        currentAction: shieldAction,
      };
      const enemy3: Character = {
        ...exampleEnemy3,
        currentAction: shieldAction,
      };
      const enemyExpected1: Character = {
        ...enemy1,
        stats: {
          ...enemy1.stats,
          currentShield: enemy1.stats.currentShield + shieldAction.value,
        },
      };
      const enemyExpected2: Character = {
        ...enemy2,
        stats: {
          ...enemy2.stats,
          currentShield: enemy2.stats.currentShield + shieldAction.value,
        },
      };
      const enemyExpected3: Character = {
        ...enemy3,
        stats: {
          ...enemy3.stats,
          currentShield: enemy3.stats.currentShield + shieldAction.value,
        },
      };
      const updatedEnemiesExpected: Character[] = [
        enemyExpected1,
        enemyExpected2,
        enemyExpected3,
      ];
      const expectedPlayer: Character = {
        ...defaultPlayer,
      };
      const defendingEnemies = [enemy1, enemy2, enemy3];

      const updatedCharacters = enemyService.performActions(
        defendingEnemies,
        expectedPlayer
      );

      expect(updatedCharacters.player).toEqual(expectedPlayer);
      expect(updatedCharacters.enemies).toEqual(updatedEnemiesExpected);
      expect(updatedCharacters.enemies).toContain(enemyExpected1);
      expect(updatedCharacters.enemies).toContain(enemyExpected2);
      expect(updatedCharacters.enemies).toContain(enemyExpected3);
      expect(updatedCharacters.enemies[0].stats.currentShield).toBe(
        enemyExpected1.stats.currentShield
      );
      expect(updatedCharacters.enemies[1].stats.currentShield).toBe(
        enemyExpected2.stats.currentShield
      );
      expect(updatedCharacters.enemies[2].stats.currentShield).toBe(
        enemyExpected3.stats.currentShield
      );
    });

    it('related to attack should update player stats', () => {
      const expectedEnemy1: Character = {
        ...exampleEnemy1,
        currentAction: swordAction,
      };
      const expectedEnemy2: Character = {
        ...exampleEnemy2,
        currentAction: swordAction,
      };
      const expectedEnemy3: Character = {
        ...exampleEnemy3,
        currentAction: swordAction,
      };
      const updatedEnemiesExpected: Character[] = [
        expectedEnemy1,
        expectedEnemy2,
        expectedEnemy3,
      ];
      const player: Character = {
        ...defaultPlayer,
      };
      const expectedPlayer: Character = {
        ...player,
        stats: {
          ...player.stats,
          currentHealth: defaultPlayer.stats.currentHealth - swordAction.value,
          currentShield:
            defaultPlayer.stats.currentShield - swordAction.value * 2,
        },
      };
      const attackingEnemies = [expectedEnemy1, expectedEnemy2, expectedEnemy3];

      const updatedCharacters = enemyService.performActions(
        attackingEnemies,
        player
      );

      expect(updatedCharacters.player).toEqual(expectedPlayer);
      expect(updatedCharacters.enemies).toEqual(updatedEnemiesExpected);
      expect(updatedCharacters.enemies).toContain(expectedEnemy1);
      expect(updatedCharacters.enemies).toContain(expectedEnemy2);
      expect(updatedCharacters.enemies).toContain(expectedEnemy3);
      expect(updatedCharacters.enemies[0].stats).toEqual(expectedEnemy1.stats);
      expect(updatedCharacters.enemies[1].stats).toEqual(expectedEnemy2.stats);
      expect(updatedCharacters.enemies[2].stats).toEqual(expectedEnemy3.stats);
    });
  });
});
