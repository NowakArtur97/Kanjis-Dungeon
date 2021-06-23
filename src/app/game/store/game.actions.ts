import { createAction, props } from '@ngrx/store';

import CharacterPlayedAnimation from '../character/models/character-played-animation.model';
import CharacterPosition from '../character/models/character-position.model';
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

// TODO: TEST
export const finishCharacterAnimation = createAction(
  '[Game] Finish Character Animation',
  props<{ character: Character }>()
);

export const setAnimationPosition = createAction(
  '[Game] Set animation Position',
  props<{ animationPosition: CharacterPosition }>()
);
