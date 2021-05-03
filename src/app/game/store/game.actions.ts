import { createAction, props } from '@ngrx/store';

export const chooseLevel = createAction(
  '[Game] Choose Level',
  props<{ level: number }>()
);
