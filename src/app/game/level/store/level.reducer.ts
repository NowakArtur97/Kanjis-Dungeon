import { Action, createReducer, on } from '@ngrx/store';

import * as LevelActions from './level.actions';

export interface LevelStoreState {
  level: number;
}
const initialState: LevelStoreState = {
  level: 0,
};

export { initialState };

const _levelReducer = createReducer(
  initialState,

  on(LevelActions.chooseLevel, (state, { level }) => ({ ...state, level }))
);

export function levelReducer(
  state: LevelStoreState,
  action: Action
): LevelStoreState {
  return _levelReducer(state, action);
}
