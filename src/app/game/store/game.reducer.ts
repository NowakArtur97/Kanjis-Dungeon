import { Action, createReducer, on } from '@ngrx/store';

import * as GameActions from './game.actions';

export interface GameStoreState {
  level: number;
}
const initialState: GameStoreState = {
  level: 0,
};

const _gameReducer = createReducer(
  initialState,

  on(GameActions.chooseLevel, (state, { level }) => ({
    ...state,
    level,
  }))
);

export function gameReducer(
  state: GameStoreState,
  action: Action
): GameStoreState {
  return _gameReducer(state, action);
}
