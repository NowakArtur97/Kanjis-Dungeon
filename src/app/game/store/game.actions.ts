import { createAction, props } from '@ngrx/store';

import GameTurn from '../enums/game-turn.enum';

export const chooseLevel = createAction(
  '[Game] Choose level',
  props<{ level: number }>()
);

export const changeTurn = createAction(
  '[Game] Change turn',
  props<{ turn: GameTurn }>()
);
