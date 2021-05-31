import { Action, createReducer, on } from '@ngrx/store';

import GamePhase from '../enums/game-phase.enum';
import GameTurn from '../enums/game-turn.enum';
import * as GameActions from './game.actions';

export interface GameStoreState {
  level: number;
  turn: GameTurn;
  phase: GamePhase;
}
const initialState: GameStoreState = {
  level: 0,
  turn: GameTurn.PLAYER_TURN,
  phase: GamePhase.QUIZ,
};
export { initialState };

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
  })),

  on(GameActions.changePhase, (state) => ({
    ...state,
    phase: state.phase === GamePhase.QUIZ ? GamePhase.BATTLE : GamePhase.QUIZ,
  }))
);

export function gameReducer(
  state: GameStoreState,
  action: Action
): GameStoreState {
  return _gameReducer(state, action);
}
