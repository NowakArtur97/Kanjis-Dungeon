import { Action, createReducer, on } from '@ngrx/store';

import CharacterPlayedAnimation from '../character/models/character-played-animation.model';
import GamePhase from '../enums/game-phase.enum';
import GameTurn from '../enums/game-turn.enum';
import * as GameActions from './game.actions';

export interface GameStoreState {
  level: number;
  turn: GameTurn;
  phase: GamePhase;
  playedAnimation: CharacterPlayedAnimation;
}
const initialState: GameStoreState = {
  level: 0,
  turn: GameTurn.PLAYER_TURN,
  phase: GamePhase.BATTLE,
  playedAnimation: null,
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
  })),

  // TODO: TEST
  on(GameActions.startCharacterAnimation, (state, { playedAnimation }) => ({
    ...state,
    playedAnimation,
  })),

  // TODO: TEST
  on(GameActions.finishCharacterAnimation, (state) => ({
    ...state,
    playedAnimation: null,
  }))
);

export function gameReducer(
  state: GameStoreState,
  action: Action
): GameStoreState {
  return _gameReducer(state, action);
}
