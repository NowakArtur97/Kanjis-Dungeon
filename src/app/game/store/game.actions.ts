import { createAction, props } from '@ngrx/store';

export const chooseLevel = createAction(
  '[Game] Choose Level',
  props<{ level: number }>()
);

export const changeTurn = createAction('[Game] Change Turn');

export const changePhase = createAction('[Game] Change Phase');
