import Character from 'src/app/game/character/models/character.model';

import {
  allEnemies,
  exampleEnemy1,
  exampleEnemy2,
  exampleEnemy3,
} from '../../enemy.data';
import * as EnemyActions from '../enemy.actions';
import { enemyReducer, EnemyStoreState } from '../enemy.reducer';

const initialState: EnemyStoreState = {
  enemies: [],
  allEnemies,
};
const enemyWithId: Character = { ...exampleEnemy1, id: 1 };
const enemyWithId2: Character = { ...exampleEnemy2, id: 2 };
const enemyWithId3: Character = { ...exampleEnemy3, id: 3 };
const enemies = [enemyWithId, enemyWithId2, enemyWithId3];
const stateWithEnemies: EnemyStoreState = {
  enemies,
  allEnemies,
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

    it('when enemy is dead should not set enemy', () => {
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
        exampleEnemy1,
        exampleEnemy2,
        exampleEnemy3,
      ];
      const stateWithEnemies: EnemyStoreState = {
        ...initialState,
        enemies: expectedEnemies,
      };

      const action = EnemyActions.setEnemies({ enemies: expectedEnemies });
      const actualState = enemyReducer(initialState, action);
      const expectedState = { ...stateWithEnemies };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(expectedEnemies);
      expect(actualState.enemies.length).toBe(expectedEnemies.length);
    });

    it('should set enemies without dead enemies', () => {
      const deadEnemy: Character = {
        ...exampleEnemy3,
        stats: {
          ...exampleEnemy3.stats,
          currentHealth: 0,
        },
      };
      const enemies: Character[] = [exampleEnemy1, exampleEnemy2, deadEnemy];
      const expectedEnemies: Character[] = [exampleEnemy1, exampleEnemy2];
      const stateWithEnemies: EnemyStoreState = {
        ...initialState,
        enemies: expectedEnemies,
      };

      const action = EnemyActions.setEnemies({ enemies });
      const actualState = enemyReducer(initialState, action);
      const expectedState = { ...stateWithEnemies };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(expectedEnemies);
      expect(actualState.enemies.length).toBe(expectedEnemies.length);
    });
  });
});
