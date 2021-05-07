import { createAction, props } from '@ngrx/store';

export const chooseLevel = createAction(
  '[Game] Choose level',
  props<{ level: number }>()
);

export const changeTurn = createAction('[Game] Change turn');
