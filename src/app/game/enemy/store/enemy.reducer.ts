import { Action, createReducer, on } from '@ngrx/store';

import Character from '../../character/models/character.model';
import * as EnemyActions from './enemy.actions';

export interface EnemyStoreState {
  enemies: Character[];
}

const initialState: EnemyStoreState = {
  enemies: [],
};

const _enemyReducer = createReducer(
  initialState,

  on(EnemyActions.chooseEnemies, (state, { enemies }) => ({
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
