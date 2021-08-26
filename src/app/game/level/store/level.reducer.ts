import { Action, createReducer, on } from '@ngrx/store';

import levels from '../level.data';
import Level from '../models/level.model';
import * as LevelActions from './level.actions';

export interface LevelStoreState {
  level: number;
  allLevels: Level[];
}
const initialState: LevelStoreState = {
  level: 0,
  allLevels: levels,
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
