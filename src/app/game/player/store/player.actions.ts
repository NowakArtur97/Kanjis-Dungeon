import { createAction, props } from '@ngrx/store';

import Character from '../../character/models/character.model';

export const setPlayer = createAction(
  '[Player] Set Player',
  props<{ player: Character }>()
);

export const startPlayerTurn = createAction('[Player] Start Player Turn');

export const endPlayerTurn = createAction('[Player] End Player Turn');

export const useCardOnPlayer = createAction('[Player] Use Card on Player');
