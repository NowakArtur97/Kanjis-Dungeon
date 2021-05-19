import { Action, createReducer, on } from '@ngrx/store';

import Character from '../../character/models/character.model';
import defaultPlayer from '../player.data';
import * as PlayerActions from './player.actions';

export interface PlayerStoreState {
  player: Character;
}

const initialState: PlayerStoreState = {
  player: defaultPlayer,
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
