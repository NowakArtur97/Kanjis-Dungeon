import { createAction, props } from '@ngrx/store';

import Level from '../models/level.model';

export const chooseLevel = createAction(
  '[Level] Choose Level',
  props<{ level: number }>()
);

export const setupLevels = createAction('[Level] Setup Levels');

export const setLevels = createAction(
  '[Level] Set Levels',
  props<{ allLevels: Level[] }>()
);
