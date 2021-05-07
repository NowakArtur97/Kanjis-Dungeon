import { createAction, props } from '@ngrx/store';

import Character from '../../character/models/character.model';

export const setEnemies = createAction(
  '[Enemy] Set Enemies',
  props<{ enemies: Character[] }>()
);

export const startEnemyTurn = createAction('[Enemy] Start Enemy Turn');

export const endEnemyTurn = createAction('[Enemy] End Enemy Turn');

export const useCardOnEnemy = createAction(
  '[Enemy] Use Card on Enemy',
  props<{ enemy: Character }>()
);
