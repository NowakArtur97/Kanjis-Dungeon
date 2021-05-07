import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import * as EnemyActions from '../../enemy/store/enemy.actions';
import GameTurn from '../../enums/game-turn.enum';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import GameEffects from '../game.effects';

describe('GameEffects', () => {
  let gameEffects: GameEffects;
  let actions$: ReplaySubject<any>;
  let store: any;

  const stateWithEnemyTurn: Partial<AppStoreState> = {
    game: {
      level: 0,
      turn: GameTurn.ENEMY_TURN,
    },
  };
  const stateWithPlayerTurn: Partial<AppStoreState> = {
    game: {
      level: 0,
      turn: GameTurn.PLAYER_TURN,
    },
  };

  describe('chooseLevel$', () => {
    describe('with enemy turn', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
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
        actions$.next(GameActions.chooseLevel);
      });

      describe('when chosing level', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(GameActions.chooseLevel);
        });
        it('should return a startEnemyTurn action', () => {
          gameEffects.chooseLevel$.subscribe((resultAction) => {
            expect(resultAction).toEqual(EnemyActions.startEnemyTurn());
          });
        });
      });

      describe('when changing turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(GameActions.changeTurn);
        });
        it('should return a startEnemyTurn action', () => {
          gameEffects.chooseLevel$.subscribe((resultAction) => {
            expect(resultAction).toEqual(EnemyActions.startEnemyTurn());
          });
        });
      });
    });

    describe('with player turn', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
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

      describe('when chosing level', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(GameActions.chooseLevel);
        });
        it('should return a startPlayerTurn action', () => {
          gameEffects.chooseLevel$.subscribe((resultAction) => {
            expect(resultAction).toEqual(PlayerActions.startPlayerTurn());
          });
        });
      });

      describe('when changing turn', () => {
        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(GameActions.changeTurn);
        });
        it('should return a startPlayerTurn action', () => {
          gameEffects.chooseLevel$.subscribe((resultAction) => {
            expect(resultAction).toEqual(PlayerActions.startPlayerTurn());
          });
        });
      });
    });
  });
});
