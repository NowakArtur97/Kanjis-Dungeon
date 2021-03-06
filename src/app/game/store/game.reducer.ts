import { Action, createReducer, on } from '@ngrx/store';

import CharacterPlayedAnimation from '../character/models/character-played-animation.model';
import GamePhase from '../enums/game-phase.enum';
import GameResult from '../enums/game-result.enum';
import GameTurn from '../enums/game-turn.enum';
import * as GameActions from './game.actions';

export interface GameStoreState {
  turn: GameTurn;
  phase: GamePhase;
  result: GameResult;
  playedAnimation: CharacterPlayedAnimation;
}
const initialState: GameStoreState = {
  turn: GameTurn.PLAYER_TURN,
  phase: GamePhase.QUIZ,
  result: null,
  playedAnimation: null,
};
export { initialState };

const _gameReducer = createReducer(
  initialState,

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

  on(GameActions.startCharacterAnimation, (state, { playedAnimation }) => ({
    ...state,
    playedAnimation,
  })),

  on(GameActions.finishCharacterAnimation, (state) => ({
    ...state,
    playedAnimation: null,
  })),

  on(GameActions.completeLevel, (state, { result }) => ({
    ...state,
    result,
  })),

  on(GameActions.resetGame, () => ({
    ...initialState,
  }))
);

export function gameReducer(
  state: GameStoreState,
  action: Action
): GameStoreState {
  return _gameReducer(state, action);
}
