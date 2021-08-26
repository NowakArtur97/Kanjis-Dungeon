import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import { stunnedAction } from '../../character/character-action/character-action.data';
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

  const enemy1: Character = {
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentShield: 0,
    },
    allActions: [swordAction, shieldAction],
  };
  const enemy2: Character = {
    ...imp,
    allActions: [swordAction, shieldAction],
  };
  const enemy3: Character = {
    ...pigWarrior,
    allActions: [swordAction, shieldAction],
  };
  const allEnemies: Character[] = [enemy1, enemy2, enemy3];
  const enemyWithId1: Character = {
    ...enemy1,
    id: 1,
  };
  const enemyWithId2: Character = {
    ...enemy2,
    id: 2,
  };
  const enemyWithId3: Character = {
    ...enemy3,
    id: 3,
  };
  const enemiesWithIds: Character[] = [
    enemyWithId1,
    enemyWithId2,
    enemyWithId3,
  ];
  const enemyWithAction1: Character = {
    ...enemyWithId1,
    currentAction: shieldAction,
  };
  const enemyWithAction2: Character = {
    ...enemyWithId2,
    currentAction: swordAction,
  };
  const enemyWithAction3: Character = {
    ...enemyWithId3,
    currentAction: swordAction,
  };
  const enemyStunned1: Character = {
    ...enemyWithAction1,
    currentAction: stunnedAction,
  };
  const enemyStunned2: Character = {
    ...enemyWithAction2,
    currentAction: stunnedAction,
  };
  const enemyWithoutAction1: Character = {
    ...enemyWithAction1,
    currentAction: null,
  };
  const enemyWithoutAction2: Character = {
    ...enemyWithAction2,
    currentAction: null,
  };
  const onFireStatusWithValue: CharacterStatus = {
    ...burnedStatus,
    value: phoenixSummoningCard.statusValue,
    maxRemainingNumberOfActiveRounds:
      phoenixSummoningCard.maxStatusNumberOfActiveRounds,
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

  describe('when choose enemies', () => {
    it('should return enemies with ids', () => {
      const level = 1;

      const enemiesActual = enemyService.chooseEnemies(level, allEnemies);

      expect(enemiesActual).toEqual(enemiesWithIds);
      expect(enemiesActual).toContain(enemyWithId1);
      expect(enemiesActual).toContain(enemyWithId2);
      expect(enemiesActual).toContain(enemyWithId3);
      expect(enemiesActual.length).toBe(enemiesWithIds.length);
    });
  });

  describe('when choose first enemy for action', () => {
    it('and no enemy is stunned should return first enemy', () => {
      const enemies = [enemyWithAction1, enemyWithAction2, enemyWithAction3];
      const enemyExpected = enemies[0];

      const enemyActual = enemyService.chooseFirstEnemyForAction(enemies);

      expect(enemyActual).toEqual(enemyExpected);
    });

    it('and first enemy is stunned should return second enemy', () => {
      const enemies = [enemyStunned1, enemyWithAction2, enemyWithAction3];
      const enemyExpected = enemies[1];

      const enemyActual = enemyService.chooseFirstEnemyForAction(enemies);

      expect(enemyActual).toEqual(enemyExpected);
    });
  });

  describe('when choose enemy for action', () => {
    it('should return first not chosen enemy', () => {
      const enemies = [enemyWithAction1, enemyWithAction2, enemyWithAction3];
      const enemyExpected = enemies[1];

      const enemyActual = enemyService.chooseEnemyForAction(
        enemies,
        enemyWithAction1
      );

      expect(enemyActual).toEqual(enemyExpected);
    });

    it('and no enemy is stunned and first enemy was already chosen should return not already chosen enemy', () => {
      const enemies = [
        enemyWithoutAction1,
        enemyWithoutAction2,
        enemyWithAction3,
      ];
      const enemyExpected = enemies[2];

      const enemyActual = enemyService.chooseEnemyForAction(
        enemies,
        enemyWithoutAction2
      );

      expect(enemyActual).toEqual(enemyExpected);
    });

    it('and first enemy was already chosen and second enemy is stunned should return third enemy', () => {
      const enemies = [enemyWithAction1, enemyStunned2, enemyWithAction3];
      const enemyExpected = enemies[2];

      const enemyActual = enemyService.chooseEnemyForAction(
        enemies,
        enemyWithAction1
      );

      expect(enemyActual).toEqual(enemyExpected);
    });
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
        enemiesWithIds
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

      const updatedEnemiesActual = enemyService.applyStatusesOnEnemies(
        enemiesWithIds
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual.length).toBe(updatedEnemiesExpected.length);
    });
  });

  describe('when choose random enemies actions', () => {
    it('should return enemies with actions', () => {
      spyOn(MathUtil, 'getRandomIndex').and.returnValues(1, 0, 0);
      const updatedEnemiesExpected: Character[] = [
        enemyWithAction1,
        enemyWithAction2,
        enemyWithAction3,
      ];

      const updatedEnemiesActual = enemyService.chooseRandomEnemiesActions(
        enemiesWithIds
      );

      expect(updatedEnemiesActual).toEqual(updatedEnemiesExpected);
      expect(updatedEnemiesActual).toContain(enemyWithAction1);
      expect(updatedEnemiesActual).toContain(enemyWithAction2);
      expect(updatedEnemiesActual).toContain(enemyWithAction3);
      expect(updatedEnemiesActual[0].currentAction).toEqual(
        enemyWithAction1.currentAction
      );
      expect(updatedEnemiesActual[1].currentAction).toEqual(
        enemyWithAction2.currentAction
      );
      expect(updatedEnemiesActual[2].currentAction).toEqual(
        enemyWithAction3.currentAction
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
