import { Action, createReducer, on } from '@ngrx/store';

import ALL_LEVELS from '../level.data';
import Level from '../models/level.model';
import * as LevelActions from './level.actions';

export interface LevelStoreState {
  level: number;
  allLevels: Level[];
}
let id = 1;
const initialState: LevelStoreState = {
  level: 0,
  allLevels: ALL_LEVELS,
};

export { initialState };

const _levelReducer = createReducer(
  initialState,

  on(LevelActions.chooseLevel, (state, { level }) => ({ ...state, level })),

  on(LevelActions.setLevels, (state, { allLevels }) => ({
    ...state,
    allLevels,
  }))
);

export function levelReducer(
  state: LevelStoreState,
  action: Action
): LevelStoreState {
  return _levelReducer(state, action);
}
