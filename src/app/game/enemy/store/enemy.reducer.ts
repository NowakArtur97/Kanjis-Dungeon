import { Action, createReducer, on } from '@ngrx/store';

import Character from '../../character/models/character.model';
import * as EnemyActions from './enemy.actions';

export interface EnemyStoreState {
  enemies: Character[];
}

const initialState: EnemyStoreState = {
  enemies: [],
};

const _gameReducer = createReducer(
  initialState,

  on(EnemyActions.chooseEnemies, (state, { enemies }) => ({
    ...state,
    enemies,
  }))
);

export function gameReducer(
  state: EnemyStoreState,
  action: Action
): EnemyStoreState {
  return _gameReducer(state, action);
}
