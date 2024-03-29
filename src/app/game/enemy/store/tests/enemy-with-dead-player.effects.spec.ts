import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import GameResult from 'src/app/game/enums/game-result.enum';
import defaultPlayer from 'src/app/game/player/player.data';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../../../store/game.actions';
import { pigWarrior } from '../../enemy.data';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';
import { initialState } from '../enemy.reducer';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let enemyService: EnemyService;
  const stateWithDeadPlayer: Partial<AppStoreState> = {
    enemy: {
      ...initialState,
    },
    player: {
      player: {
        ...defaultPlayer,
        stats: {
          ...defaultPlayer.stats,
          currentHealth: 0,
        },
      },
    },
  };

  describe('startEnemyTurn$', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          EnemyEffects,
          provideMockStore({ initialState: stateWithDeadPlayer }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: EnemyService,
            useValue: jasmine.createSpyObj('enemyService', [
              'chooseFirstEnemyForAction',
            ]),
          },
        ],
      })
    );

    beforeEach(() => {
      enemyEffects = TestBed.inject(EnemyEffects);
      enemyService = TestBed.inject(EnemyService);
    });

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(EnemyActions.startEnemyTurn);
    });

    it('should return a completeLevel actions', () => {
      enemyEffects.startEnemyTurn$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          GameActions.completeLevel({ result: GameResult.LOSE })
        );
        expect(enemyService.chooseFirstEnemyForAction).not.toHaveBeenCalled();
      });
    });
  });

  describe('finishCharacterAnimation$', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          EnemyEffects,
          provideMockStore({ initialState: stateWithDeadPlayer }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
        ],
      })
    );

    beforeEach(() => {
      enemyEffects = TestBed.inject(EnemyEffects);
    });

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(
        GameActions.finishCharacterAnimation({ character: pigWarrior })
      );
    });

    it('should return a endEnemyTurn action', () => {
      enemyEffects.finishCharacterAnimation$
        .pipe(take(1))
        .subscribe((resultAction) => {
          expect(resultAction).toEqual(EnemyActions.endEnemyTurn());
        });
    });
  });
});
