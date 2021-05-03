import Character from 'src/app/game/character/models/character.model';

import * as EnemyActions from '../enemy.actions';
import { enemyReducer, EnemyStoreState } from '../enemy.reducer';

const initialState: EnemyStoreState = {
  enemies: [],
};

describe('enemyReducer', () => {
  describe('EnemyActions.chooseEnemies', () => {
    it('should choose enemies', () => {
      const enemies: Character[] = [
        {
          name: 'goblin-archer',
          stats: {
            maxHealth: 70,
            currentHealth: 70,
            maxDamage: 12,
            damage: 10,
            currentShield: 0,
            isEnemy: true,
          },
          animations: [
            {
              spriteSheet: 'idle',
              numberOfFrames: 4,
              animationTimeInMiliseconds: 600,
              animationIterationCount: 'Infinite',
            },
          ],
          statuses: [
            {
              spriteSheet: 'book',
              remainingNumberOfActiveRounds: 3,
            },
          ],
          action: {
            action: 'sword',
            value: 5,
          },
        },
        {
          name: 'goblin-archer',
          stats: {
            maxHealth: 60,
            currentHealth: 15,
            maxDamage: 12,
            damage: 10,
            currentShield: 8,
            isEnemy: true,
          },
          animations: [
            {
              spriteSheet: 'idle',
              numberOfFrames: 4,
              animationTimeInMiliseconds: 600,
              animationIterationCount: 'Infinite',
            },
          ],
          statuses: [
            {
              spriteSheet: 'heart',
              remainingNumberOfActiveRounds: 2,
            },
          ],
          action: {
            action: 'sword',
            value: 5,
          },
        },
        {
          name: 'goblin-archer',
          stats: {
            maxHealth: 50,
            currentHealth: 20,
            damage: 10,
            maxDamage: 12,
            currentShield: 2,
            isEnemy: true,
          },
          animations: [
            {
              spriteSheet: 'idle',
              numberOfFrames: 4,
              animationTimeInMiliseconds: 600,
              animationIterationCount: 'Infinite',
            },
          ],
          statuses: [
            {
              spriteSheet: 'heart',
              remainingNumberOfActiveRounds: 2,
            },
            {
              spriteSheet: 'book',
              remainingNumberOfActiveRounds: 3,
            },
          ],
          action: {
            action: 'shield',
            value: 11,
          },
        },
      ];
      const stateWithEnemies: EnemyStoreState = {
        enemies,
      };

      const action = EnemyActions.chooseEnemies({ enemies });
      const actualState = enemyReducer(initialState, action);
      const expectedState = { ...stateWithEnemies };

      expect(actualState).toEqual(expectedState);
      expect(actualState.enemies).toEqual(enemies);
      expect(actualState.enemies.length).toBe(enemies.length);
    });
  });
});
