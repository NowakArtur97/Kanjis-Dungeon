import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import RADICALS from 'src/app/japanese/radical/radical.data';
import { initialState as quizInitialState } from 'src/app/quiz/store/quiz.reducer';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../../quiz/store/quiz.actions';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import GamePhase from '../../enums/game-phase.enum';
import GameTurn from '../../enums/game-turn.enum';
import * as LevelActions from '../../level/store/level.actions';
import { initialState as levelInitialState } from '../../level/store/level.reducer';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import GameEffects from '../game.effects';
import { initialState } from '../game.reducer';

describe('GameEffects', () => {
  let gameEffects: GameEffects;
  let actions$: ReplaySubject<any>;
  let store: any;

  const stateWithZeroQuestions: Partial<AppStoreState> = {
    quiz: {
      ...quizInitialState,
    },
    level: {
      ...levelInitialState,
    },
  };
  const stateWithQuestions: Partial<AppStoreState> = {
    ...stateWithZeroQuestions,
    quiz: {
      ...quizInitialState,
      questions: [RADICALS[0]],
    },
  };
  const stateWithEnemyTurn: Partial<AppStoreState> = {
    ...stateWithZeroQuestions,
    game: {
      ...initialState,
      turn: GameTurn.ENEMY_TURN,
      phase: GamePhase.QUIZ,
    },
  };
  const stateWithPlayerTurn: Partial<AppStoreState> = {
    ...stateWithZeroQuestions,
    game: {
      ...initialState,
      turn: GameTurn.PLAYER_TURN,
      phase: GamePhase.QUIZ,
    },
  };

  describe('choseLevel$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(LevelActions.chooseLevel);
    });
    it('should return a resetGame and chooseLevel actions', () => {
      gameEffects.chooseLevel$.pipe(take(1)).subscribe((resultAction) => {
        expect(resultAction).toEqual(GameActions.resetGame());
      });
      gameEffects.chooseLevel$
        .pipe(skip(1), take(1))
        .subscribe((resultAction) => {
          expect(resultAction).toEqual(PlayerActions.startPlayerTurn());
        });
    });
  });

  describe('changeTurn$', () => {
    describe('with enemy turn', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [
            StoreModule.forRoot({}),
            RouterTestingModule.withRoutes([]),
          ],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithEnemyTurn }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(GameActions.changeTurn);
      });
      it('should return a startEnemyTurn action', () => {
        gameEffects.changeTurn$.subscribe((resultAction) => {
          expect(resultAction).toEqual(EnemyActions.startEnemyTurn());
        });
      });
    });

    describe('with player turn', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [
            StoreModule.forRoot({}),
            RouterTestingModule.withRoutes([]),
          ],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithPlayerTurn }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(GameActions.changeTurn);
      });

      it('should return a startPlayerTurn action', () => {
        gameEffects.changeTurn$.subscribe((resultAction) => {
          expect(resultAction).toEqual(PlayerActions.startPlayerTurn());
        });
      });
    });
  });

  describe('changePhase$', () => {
    describe('with zero number of question', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [
            StoreModule.forRoot({}),
            RouterTestingModule.withRoutes([]),
          ],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithZeroQuestions }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      describe('when answered correctly', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(QuizActions.addAnswer);
        });

        it('should return a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).toEqual(GameActions.changePhase());
          });
        });
      });

      describe('when end of enemy turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(EnemyActions.endEnemyTurn);
        });

        it('should return a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).toEqual(GameActions.changePhase());
          });
        });
      });
    });

    describe('with not answered questions', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [
            StoreModule.forRoot({}),
            RouterTestingModule.withRoutes([]),
          ],
          providers: [
            GameEffects,
            provideMockStore({ initialState: stateWithQuestions }),
            {
              provide: Store,
              useClass: MockStore,
            },
            provideMockActions(() => actions$),
          ],
        })
      );

      beforeEach(() => {
        gameEffects = TestBed.inject(GameEffects);
        store = TestBed.inject(MockStore);
      });

      describe('when answered correctly', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(QuizActions.addAnswer);
        });

        it('should not return a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).not.toEqual(GameActions.changePhase());
          });
        });
      });

      describe('when end of enemy turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(EnemyActions.endEnemyTurn);
        });

        it('should return not a changePhase action', () => {
          gameEffects.changePhase$.subscribe((resultAction) => {
            expect(resultAction).not.toEqual(GameActions.changePhase());
          });
        });
      });
    });
  });

  describe('completeLevel$', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
        providers: [
          GameEffects,
          provideMockStore({ initialState }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
        ],
      })
    );

    beforeEach(() => {
      gameEffects = TestBed.inject(GameEffects);
      store = TestBed.inject(MockStore);
    });

    describe('when answered correctly', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(GameActions.completeLevel);
      });

      it('should return a shouldShowSummary action', () => {
        gameEffects.completeLevel$.subscribe((resultAction) => {
          expect(resultAction).toEqual(QuizActions.showSummary());
        });
      });
    });
  });
});
