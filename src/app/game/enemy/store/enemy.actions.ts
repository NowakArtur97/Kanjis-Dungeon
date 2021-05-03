import { createAction, props } from '@ngrx/store';

import Character from '../../character/models/character.model';

export const chooseEnemies = createAction(
  '[Enemy] Choose Enemies',
  props<{ enemies: Character[] }>()
);
