import { createAction, props } from '@ngrx/store';

import CharacterPlayedAnimation from '../character/models/character-played-animation.model';
import Character from '../character/models/character.model';
import GameResult from '../enums/game-result.enum';

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

export const completeLevel = createAction(
  '[Game] Complete Level',
  props<{ result: GameResult }>()
);

export const resetGame = createAction('[Game] Reset Game');
