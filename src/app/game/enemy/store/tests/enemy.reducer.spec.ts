import Character from 'src/app/game/character/models/character.model';

import { allEnemies, exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../../enemy.data';
import * as EnemyActions from '../enemy.actions';
import { enemyReducer, EnemyStoreState } from '../enemy.reducer';

const initialState: EnemyStoreState = {
  enemies: [],
  allEnemies,
};

describe('enemyReducer', () => {
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
