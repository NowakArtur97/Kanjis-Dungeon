import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import { burnedStatus } from '../../character/character-status.data';
import CharacterStatus from '../../character/models/character-status.model';
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
  const onFireStatusWithValue: CharacterStatus = {
    ...burnedStatus,
    value: phoenixSummoningCard.statusValue,
  };

  const enemyWithStatus1: Character = {
    ...enemyWithId1,
    stats: {
      ...enemyWithId1.stats,
      currentShield: 0,
    },
    statuses: [onFireStatusWithValue],
  };
  const enemyWithStatus2: Character = {
    ...enemyWithId2,
    stats: {
      ...enemyWithId2.stats,
      currentShield: 20,
    },
    statuses: [onFireStatusWithValue],
  };
  const enemyWithStatus3: Character = {
    ...enemyWithId3,
    stats: {
      ...enemyWithId3.stats,
      currentShield: 0,
    },
    statuses: [onFireStatusWithValue],
  };

  const enemies: Character[] = [enemyWithId1, enemyWithId2, enemyWithId3];
  const enemiesWithStatuses: Character[] = [
    enemyWithStatus1,
    enemyWithStatus2,
    enemyWithStatus3,
  ];

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

  describe('when use card on enemy', () => {
    it('should return updated enemies', () => {
      const expectedEnemy1: Character = {
        ...enemyWithId1,
        stats: {
          ...enemyWithId1.stats,
          currentHealth:
            enemyWithId1.stats.currentHealth - phoenixSummoningCard.value,
        },
        statuses: [onFireStatusWithValue],
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

  describe('when apply statuses on enemies', () => {
    it('should return updated enemies', () => {
      const onFireStatusWithValueAndDecreasedRemainingNumberOfActiveRounds: CharacterStatus = {
        ...onFireStatusWithValue,
        remainingNumberOfActiveRounds:
          onFireStatusWithValue.remainingNumberOfActiveRounds - 1,
      };
      const expectedEnemy1: Character = {
        ...enemyWithId1,
        stats: {
          ...enemyWithStatus1.stats,
          currentHealth:
            enemyWithStatus1.stats.currentHealth - onFireStatusWithValue.value,
        },
        statuses: [
          onFireStatusWithValueAndDecreasedRemainingNumberOfActiveRounds,
        ],
      };
      const expectedEnemy2: Character = {
        ...enemyWithStatus2,
        stats: {
          ...enemyWithStatus2.stats,
          currentShield:
            enemyWithStatus2.stats.currentShield - onFireStatusWithValue.value,
        },
        statuses: [
          onFireStatusWithValueAndDecreasedRemainingNumberOfActiveRounds,
        ],
      };
      const expectedEnemy3: Character = {
        ...enemyWithStatus3,
        stats: {
          ...enemyWithStatus3.stats,
          currentHealth:
            enemyWithStatus3.stats.currentHealth - onFireStatusWithValue.value,
        },
        statuses: [
          onFireStatusWithValueAndDecreasedRemainingNumberOfActiveRounds,
        ],
      };
      const updatedEnemiesExpected: Character[] = [
        expectedEnemy1,
        expectedEnemy2,
        expectedEnemy3,
      ];

      const updatedEnemiesActual = enemyService.applyStatusesOnEnemies(
        enemiesWithStatuses
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(expectedEnemy1);
      expect(updatedEnemiesActual).toContain(expectedEnemy2);
      expect(updatedEnemiesActual).toContain(expectedEnemy3);
      expect(updatedEnemiesActual.length).toBe(updatedEnemiesExpected.length);
    });

    it('should return updated enemies and remove status if completed', () => {
      const onFireStatusWithValueWithOneRemainingActiveRound: CharacterStatus = {
        ...onFireStatusWithValue,
        remainingNumberOfActiveRounds: 1,
      };
      const enemyWithOneRoundRemainingStatus1: Character = {
        ...enemyWithStatus1,
        statuses: [onFireStatusWithValueWithOneRemainingActiveRound],
      };
      const enemyWithOneRoundRemainingStatus2: Character = {
        ...enemyWithStatus2,
        statuses: [onFireStatusWithValueWithOneRemainingActiveRound],
      };
      const enemyWithOneRoundRemainingStatus3: Character = {
        ...enemyWithStatus3,
        statuses: [onFireStatusWithValueWithOneRemainingActiveRound],
      };
      const enemiesWithOneRoundRemainingStatuses: Character[] = [
        enemyWithOneRoundRemainingStatus1,
        enemyWithOneRoundRemainingStatus2,
        enemyWithOneRoundRemainingStatus3,
      ];
      const expectedEnemy1: Character = {
        ...enemyWithOneRoundRemainingStatus1,
        stats: {
          ...enemyWithOneRoundRemainingStatus1.stats,
          currentHealth:
            enemyWithOneRoundRemainingStatus1.stats.currentHealth -
            onFireStatusWithValue.value,
        },
        statuses: [],
      };
      const expectedEnemy2: Character = {
        ...enemyWithOneRoundRemainingStatus2,
        stats: {
          ...enemyWithOneRoundRemainingStatus2.stats,
          currentShield:
            enemyWithOneRoundRemainingStatus2.stats.currentShield -
            onFireStatusWithValue.value,
        },
        statuses: [],
      };
      const expectedEnemy3: Character = {
        ...enemyWithOneRoundRemainingStatus3,
        stats: {
          ...enemyWithOneRoundRemainingStatus3.stats,
          currentHealth:
            enemyWithOneRoundRemainingStatus3.stats.currentHealth -
            onFireStatusWithValue.value,
        },
        statuses: [],
      };
      const updatedEnemiesExpected: Character[] = [
        expectedEnemy1,
        expectedEnemy2,
        expectedEnemy3,
      ];

      const updatedEnemiesActual = enemyService.applyStatusesOnEnemies(
        enemiesWithOneRoundRemainingStatuses
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(expectedEnemy1);
      expect(updatedEnemiesActual).toContain(expectedEnemy2);
      expect(updatedEnemiesActual).toContain(expectedEnemy3);
      expect(updatedEnemiesActual.length).toBe(updatedEnemiesExpected.length);
    });

    it('without statuses should return same enemies', () => {
      const updatedEnemiesExpected: Character[] = [
        enemyWithId1,
        enemyWithId2,
        enemyWithId3,
      ];

      const updatedEnemiesActual = enemyService.applyStatusesOnEnemies(enemies);

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
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
