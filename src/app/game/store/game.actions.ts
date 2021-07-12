import { createAction, props } from '@ngrx/store';

import CharacterPlayedAnimation from '../character/models/character-played-animation.model';
import Character from '../character/models/character.model';

export const chooseLevel = createAction(
  '[Game] Choose Level',
  props<{ level: number }>()
);

export const changeTurn = createAction('[Game] Change Turn');

export const changePhase = createAction('[Game] Change Phase');

export const startCharacterAnimation = createAction(
  '[Game] Start Character Animation',
  props<{ playedAnimation: CharacterPlayedAnimation }>()
);

export const finishCharacterAnimation = createAction(
  '[Game] Finish Character Animation',
  props<{ character: Character }>()
);
