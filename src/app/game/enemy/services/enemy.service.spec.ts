import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../../character/models/character.model';
import { phoenixSummoningCard } from '../../deck/deck.data';
import defaultPlayer from '../../player/player.data';
import { shieldAction, swordAction } from '../enemy-action.data';
import { imp, pigWarrior } from '../enemy.data';
import EnemyService from './enemy.service';

describe('enemyService', () => {
  let injector: TestBed;
  let enemyService: EnemyService;

  const enemyWithId1: Character = {
    ...pigWarrior,
    id: 1,
    stats: {
      ...pigWarrior.stats,
      currentShield: 0,
    },
    allActions: [swordAction, shieldAction],
  };
  const enemyWithId2: Character = {
    ...imp,
    id: 2,
    allActions: [swordAction, shieldAction],
  };
  const enemyWithId3: Character = {
    ...pigWarrior,
    id: 3,
    allActions: [swordAction, shieldAction],
  };
  const enemies: Character[] = [enemyWithId1, enemyWithId2, enemyWithId3];

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
        ...enemyWithId1,
        stats: {
          ...enemyWithId1.stats,
          currentHealth:
            enemyWithId1.stats.currentHealth - phoenixSummoningCard.value,
        },
      };
      const updatedEnemiesExpected: Character[] = [
        expectedEnemy1,
        enemyWithId2,
        enemyWithId3,
      ];

      const updatedEnemiesActual = enemyService.useCardOnEnemy(
        phoenixSummoningCard,
        enemyWithId1,
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
        ...enemyWithId1,
        currentAction: shieldAction,
      };
      const expectedEnemy2: Character = {
        ...enemyWithId2,
        currentAction: swordAction,
      };
      const expectedEnemy3: Character = {
        ...enemyWithId3,
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

  describe('when perform action', () => {
    it('related to defence should update enemies stats', () => {
      const enemy: Character = {
        ...pigWarrior,
        currentAction: shieldAction,
      };
      const enemyExpected: Character = {
        ...enemy,
        stats: {
          ...enemy.stats,
          currentShield: enemy.stats.currentShield + shieldAction.value,
        },
        currentAction: null,
      };
      const expectedPlayer: Character = {
        ...defaultPlayer,
      };

      const updatedCharacters = enemyService.performAction(
        enemy,
        expectedPlayer
      );

      expect(updatedCharacters.player).toEqual(expectedPlayer);
      expect(updatedCharacters.enemy).toEqual(enemyExpected);
      expect(updatedCharacters.enemy.stats.currentShield).toBe(
        enemyExpected.stats.currentShield
      );
    });

    it('related to attack on player without shield should update player stats', () => {
      const enemy: Character = {
        ...pigWarrior,
        currentAction: swordAction,
      };
      const expectedEnemy: Character = {
        ...pigWarrior,
        currentAction: null,
      };
      const player: Character = {
        ...defaultPlayer,
        stats: {
          ...defaultPlayer.stats,
          currentHealth: 80,
          currentShield: 0,
        },
        currentAction: null,
      };
      const expectedPlayer: Character = {
        ...player,
        stats: {
          ...player.stats,
          currentHealth: player.stats.currentHealth - swordAction.value,
        },
      };
      const updatedCharacters = enemyService.performAction(enemy, player);

      expect(updatedCharacters.player).toEqual(expectedPlayer);
      expect(updatedCharacters.player.stats.currentHealth).toBe(
        expectedPlayer.stats.currentHealth
      );
      expect(updatedCharacters.player.stats.currentShield).toBe(
        expectedPlayer.stats.currentShield
      );
      expect(updatedCharacters.enemy).toEqual(expectedEnemy);
    });

    it('related to attack on player with shield should update player stats', () => {
      const enemy: Character = {
        ...pigWarrior,
        currentAction: swordAction,
      };
      const expectedEnemy: Character = {
        ...pigWarrior,
        currentAction: null,
      };
      const player: Character = {
        ...defaultPlayer,
        stats: {
          ...defaultPlayer.stats,
          currentHealth: 80,
          currentShield: 15,
        },
      };
      const expectedPlayer: Character = {
        ...player,
        stats: {
          ...player.stats,
          currentShield: player.stats.currentShield - swordAction.value,
        },
      };
      const updatedCharacters = enemyService.performAction(enemy, player);

      expect(updatedCharacters.player).toEqual(expectedPlayer);
      expect(updatedCharacters.player.stats.currentHealth).toBe(
        expectedPlayer.stats.currentHealth
      );
      expect(updatedCharacters.player.stats.currentShield).toBe(
        expectedPlayer.stats.currentShield
      );
      expect(updatedCharacters.enemy).toEqual(expectedEnemy);
    });
  });
});
