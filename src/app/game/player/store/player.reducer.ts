import { Action, createReducer } from '@ngrx/store';

import Character from '../../character/models/character.model';

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
      isEnemy: false,
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

const _playerReducer = createReducer(initialState);

export function playerReducer(
  state: PlayerStoreState,
  action: Action
): PlayerStoreState {
  return _playerReducer(state, action);
}
