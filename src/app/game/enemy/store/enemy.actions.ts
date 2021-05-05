import { createAction, props } from '@ngrx/store';

import Character from '../../character/models/character.model';

export const chooseEnemies = createAction(
  '[Enemy] Choose Enemies',
  props<{ enemies: Character[] }>()
);

export const useCardOnEnemy = createAction(
  '[Enemy] Use Card on Enemy',
  props<{ enemy: Character }>()
);
