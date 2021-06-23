import { Action, createReducer, on } from '@ngrx/store';
import cloneDeep from 'lodash/cloneDeep';

import Character from '../../character/models/character.model';
import { allEnemies } from '../enemy.data';
import * as EnemyActions from './enemy.actions';

export interface EnemyStoreState {
  enemies: Character[];
  allEnemies: Character[];
}

const initialState: EnemyStoreState = {
  enemies: [],
  allEnemies,
};

const _enemyReducer = createReducer(
  initialState,

  // TODO: TEST
  on(EnemyActions.setEnemy, (state, { enemy }) => ({
    ...state,
    enemies: state.enemies
      .map((e) => (e.id === enemy.id ? cloneDeep(enemy) : e))
      .filter((e) => e.stats.currentHealth > 0),
  })),

  on(EnemyActions.setEnemies, (state, { enemies }) => ({
    ...state,
    enemies: enemies.filter((enemy) => enemy.stats.currentHealth > 0),
  }))
);

export function enemyReducer(
  state: EnemyStoreState,
  action: Action
): EnemyStoreState {
  return _enemyReducer(state, action);
}
