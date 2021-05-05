import { Action, createReducer, on } from '@ngrx/store';

import GameTurn from '../enums/game-turn.enum';
import * as GameActions from './game.actions';

export interface GameStoreState {
  level: number;
  turn: GameTurn;
}
const initialState: GameStoreState = {
  level: 0,
  turn: GameTurn.PLAYER_TURN,
};

const _gameReducer = createReducer(
  initialState,

  on(GameActions.chooseLevel, (state, { level }) => ({
    ...state,
    level,
  })),

  on(GameActions.changeTurn, (state, { turn }) => ({
    ...state,
    turn,
  }))
);

export function gameReducer(
  state: GameStoreState,
  action: Action
): GameStoreState {
  return _gameReducer(state, action);
}
