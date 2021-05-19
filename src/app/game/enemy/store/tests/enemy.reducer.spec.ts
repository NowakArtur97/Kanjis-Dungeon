import Character from 'src/app/game/character/models/character.model';

import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../../enemy.data';
import * as EnemyActions from '../enemy.actions';
import { enemyReducer, EnemyStoreState } from '../enemy.reducer';

const initialState: EnemyStoreState = {
  enemies: [],
};

describe('enemyReducer', () => {
  describe('EnemyActions.setEnemies', () => {
    it('should set enemies', () => {
      const enemies: Character[] = [
        exampleEnemy1,
        exampleEnemy2,
        exampleEnemy3,
      ];
      const stateWithEnemies: EnemyStoreState = {
        enemies,
      };

      const action = EnemyActions.setEnemies({ enemies });
      const actualState = enemyReducer(initialState, action);
      const expectedState = { ...stateWithEnemies };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(enemies);
      expect(actualState.enemies.length).toBe(enemies.length);
    });
  });
});
