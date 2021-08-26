import { createAction, props } from '@ngrx/store';

export const chooseLevel = createAction(
  '[Level] Choose Level',
  props<{ level: number }>()
);
