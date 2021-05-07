import { Action, createReducer, on } from '@ngrx/store';

import GameTurn from '../enums/game-turn.enum';
import * as GameActions from './game.actions';

export interface GameStoreState {
  level: number;
  turn: GameTurn;
}
const initialState: GameStoreState = {
  level: 0,
  turn: GameTurn.ENEMY_TURN,
};

const _gameReducer = createReducer(
  initialState,

  on(GameActions.chooseLevel, (state, { level }) => ({
    ...state,
    level,
  })),

  on(GameActions.changeTurn, (state) => ({
    ...state,
    turn:
      state.turn === GameTurn.ENEMY_TURN
        ? GameTurn.PLAYER_TURN
        : GameTurn.ENEMY_TURN,
  }))
);

export function gameReducer(
  state: GameStoreState,
  action: Action
): GameStoreState {
  return _gameReducer(state, action);
}
