import { Action, createReducer, on } from '@ngrx/store';

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

  on(EnemyActions.setEnemies, (state, { enemies }) => ({
    ...state,
    enemies,
  }))
);

export function enemyReducer(
  state: EnemyStoreState,
  action: Action
): EnemyStoreState {
  return _enemyReducer(state, action);
}
