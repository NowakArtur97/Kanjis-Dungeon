import { createAction, props } from '@ngrx/store';

import CharacterPlayedAnimation from '../character/models/character-played-animation.model';

export const chooseLevel = createAction(
  '[Game] Choose Level',
  props<{ level: number }>()
);

export const changeTurn = createAction('[Game] Change Turn');

export const changePhase = createAction('[Game] Change Phase');

export const startCharacterAnimation = createAction(
  '[Game] Start Character animation',
  props<{ playedAnimation: CharacterPlayedAnimation }>()
);

export const finishCharacterAnimation = createAction(
  '[Game] Finish Character animation'
);
