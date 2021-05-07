import { Action, createReducer, on } from '@ngrx/store';

import CharacterType from '../../character/enums/character-type.enum';
import Character from '../../character/models/character.model';
import * as PlayerActions from './player.actions';

export interface PlayerStoreState {
  player: Character;
}

const initialState: PlayerStoreState = {
  player: {
    name: 'example-character',
    stats: {
      currentHealth: 100,
      maxHealth: 100,
      damage: 20,
      maxDamage: 22,
      currentShield: 10,
      type: CharacterType.PLAYER,
    },
    animations: [
      {
        spriteSheet: 'idle',
        numberOfFrames: 4,
        animationTimeInMiliseconds: 600,
        animationIterationCount: 'Infinite',
      },
    ],
    statuses: [
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: 'heart',
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: 'book',
        remainingNumberOfActiveRounds: 3,
      },
    ],
  },
};

const _playerReducer = createReducer(
  initialState,

  on(PlayerActions.setPlayer, (state, { player }) => ({
    ...state,
    player,
  }))
);

export function playerReducer(
  state: PlayerStoreState,
  action: Action
): PlayerStoreState {
  return _playerReducer(state, action);
}
