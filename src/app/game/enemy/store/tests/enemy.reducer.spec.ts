import Character from 'src/app/game/character/models/character.model';

import { ALL_ENEMIES, imp, pigWarrior } from '../../enemy.data';
import * as EnemyActions from '../enemy.actions';
import { enemyReducer, EnemyStoreState, initialState } from '../enemy.reducer';

const enemyWithId: Character = { ...pigWarrior, id: 1 };
const enemyWithId2: Character = { ...imp, id: 2 };
const enemyWithId3: Character = { ...pigWarrior, id: 3 };
const enemiesWithIds = [enemyWithId, enemyWithId2, enemyWithId3];
const stateWithEnemies: EnemyStoreState = {
  enemies: enemiesWithIds,
  allEnemies: ALL_ENEMIES,
};

describe('enemyReducer', () => {
  describe('EnemyActions.setEnemy', () => {
    it('should set enemy', () => {
      const updatedEnemy: Character = {
        ...enemyWithId,
        stats: { ...enemyWithId.stats, currentShield: 9 },
      };
      const expectedEnemies: Character[] = [
        updatedEnemy,
        enemyWithId2,
        enemyWithId3,
      ];
      const stateWithEnemy: EnemyStoreState = {
        ...initialState,
        enemies: expectedEnemies,
      };

      const action = EnemyActions.setEnemy({ enemy: updatedEnemy });
      const actualState = enemyReducer(stateWithEnemies, action);
      const expectedState = { ...stateWithEnemy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(expectedEnemies);
      expect(actualState.enemies.length).toBe(expectedEnemies.length);
    });

    it('should not set dead enemy', () => {
      const enemyWithoutHealth: Character = {
        ...enemyWithId,
        stats: { ...enemyWithId.stats, currentHealth: 0 },
      };
      const expectedEnemies: Character[] = [enemyWithId2, enemyWithId3];
      const stateWithEnemy: EnemyStoreState = {
        ...initialState,
        enemies: expectedEnemies,
      };

      const action = EnemyActions.setEnemy({ enemy: enemyWithoutHealth });
      const actualState = enemyReducer(stateWithEnemies, action);
      const expectedState = { ...stateWithEnemy };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(expectedEnemies);
      expect(actualState.enemies.length).toBe(expectedEnemies.length);
    });
  });

  describe('EnemyActions.setEnemies', () => {
    it('should set enemies', () => {
      const expectedEnemies: Character[] = [
        enemyWithId,
        enemyWithId2,
        enemyWithId3,
      ];

      const action = EnemyActions.setEnemies({ enemies: expectedEnemies });
      const actualState = enemyReducer(initialState, action);
      const expectedState = { ...stateWithEnemies };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(expectedEnemies);
      expect(actualState.enemies.length).toBe(expectedEnemies.length);
    });

    it('should set enemies without dead enemies', () => {
      const deadEnemy: Character = {
        ...enemyWithId3,
        stats: {
          ...enemyWithId3.stats,
          currentHealth: 0,
        },
      };
      const enemies: Character[] = [enemyWithId, enemyWithId2, deadEnemy];
      const expectedEnemies: Character[] = [enemyWithId, enemyWithId2];
      const stateWithoutDeadEnemies: EnemyStoreState = {
        ...initialState,
        enemies: expectedEnemies,
      };

      const action = EnemyActions.setEnemies({ enemies });
      const actualState = enemyReducer(initialState, action);
      const expectedState = { ...stateWithoutDeadEnemies };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(expectedEnemies);
      expect(actualState.enemies.length).toBe(expectedEnemies.length);
    });
  });
});
