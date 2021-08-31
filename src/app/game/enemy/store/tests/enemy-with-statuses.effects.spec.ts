import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { burnedStatus, stunnedStatus } from 'src/app/game/character/character-statuses/character-status.data';
import CharacterStatus from 'src/app/game/character/models/character-status.model';
import Character from 'src/app/game/character/models/character.model';
import { phoenixSummoningCard } from 'src/app/game/deck/deck.data';
import * as DeckReducer from 'src/app/game/deck/store/deck.reducer';
import defaultPlayer from 'src/app/game/player/player.data';
import * as PlayerReducer from 'src/app/game/player/store/player.reducer';
import { initialState as gameInitialState } from 'src/app/game/store/game.reducer';
import AppStoreState from 'src/app/store/app.state';

import * as PlayerActions from '../../../player/store/player.actions';
import * as GameActions from '../../../store/game.actions';
import { shieldAction, swordAction } from '../../enemy-action.data';
import { imp, pigWarrior } from '../../enemy.data';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let enemyService: EnemyService;

  const enemies: Character[] = [pigWarrior, imp, pigWarrior];
  const burnedStatusWithValue: CharacterStatus = {
    ...burnedStatus,
    value: 5,
  };
  const stunnedStatusWithValue: CharacterStatus = {
    ...stunnedStatus,
    remainingNumberOfActiveRounds: 1,
  };
  const enemyWithStatus1: Character = {
    id: 1,
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentHealth: 70,
      damage: 12,
      currentShield: 10,
    },
    currentAction: swordAction,
    statuses: [stunnedStatusWithValue],
  };
  const enemyWithStatus2: Character = {
    id: 2,
    ...imp,
    stats: {
      ...imp.stats,
      currentHealth: 35,
      damage: 12,
      currentShield: 18,
    },
    currentAction: shieldAction,
    statuses: [burnedStatusWithValue],
  };
  const enemyWithStatus3: Character = {
    id: 3,
    ...pigWarrior,
    stats: {
      ...pigWarrior.stats,
      currentHealth: 30,
      currentShield: 6,
    },
    currentAction: swordAction,
    statuses: [burnedStatusWithValue],
  };
  const enemiesWithStatuses: Character[] = [
    enemyWithStatus1,
    enemyWithStatus2,
    enemyWithStatus3,
  ];
  const updatedEnemiesWithStatuses: Character[] = [
    {
      ...enemyWithStatus1,
      stats: {
        ...enemyWithStatus1.stats,
        currentShield:
          enemyWithStatus1.stats.currentShield - burnedStatusWithValue.value,
      },
    },
    {
      ...enemyWithStatus2,
      stats: {
        ...enemyWithStatus2.stats,
        currentShield:
          enemyWithStatus2.stats.currentShield - burnedStatusWithValue.value,
      },
    },
    {
      ...enemyWithStatus3,
      stats: {
        ...enemyWithStatus3.stats,
        currentShield:
          enemyWithStatus3.stats.currentShield - burnedStatusWithValue.value,
      },
    },
  ];
  const stateWithEnemiesWithStatuses: Partial<AppStoreState> = {
    player: {
      ...PlayerReducer.initialState,
    },
    deck: {
      ...DeckReducer.initialState,
      chosenCard: phoenixSummoningCard,
    },
    enemy: {
      allEnemies: enemies,
      enemies: enemiesWithStatuses,
    },
    game: {
      ...gameInitialState,
      playedAnimation: {
        character: pigWarrior,
        animationPosition: { x: 0, y: 0, topOffset: 50 },
        animationName: 'attack',
      },
    },
  };

  describe('state with enemies with statuses', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          EnemyEffects,
          provideMockStore({
            initialState: stateWithEnemiesWithStatuses,
          }),
          {
            provide: Store,
            useClass: MockStore,
          },
          provideMockActions(() => actions$),
          {
            provide: EnemyService,
            useValue: jasmine.createSpyObj('enemyService', [
              'useCardOnEnemy',
              'applyStatusesOnEnemies',
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

    describe('startPlayerTurn$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(PlayerActions.startPlayerTurn());
        (enemyService.applyStatusesOnEnemies as jasmine.Spy).and.returnValue(
          updatedEnemiesWithStatuses
        );
      });

      it('with enemies with statuses should return a setEnemies action', () => {
        enemyEffects.useCardOnEnemy$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            EnemyActions.setEnemies({ enemies: updatedEnemiesWithStatuses })
          );
          expect(enemyService.applyStatusesOnEnemies).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('startEnemyTurn$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(EnemyActions.startEnemyTurn);
        (enemyService.chooseFirstEnemyForAction as jasmine.Spy).and.returnValue(
          enemiesWithStatuses[1]
        );
      });

      it('should skip stunned enemy and return a startCharacterAnimation actions', () => {
        enemyEffects.startEnemyTurn$.subscribe((resultAction) => {
          const playedAnimation = {
            character: enemyWithStatus2,
            animationName: enemyWithStatus2.currentAction.action,
            animationPosition: defaultPlayer.position,
          };
          expect(resultAction).toEqual(
            GameActions.startCharacterAnimation({ playedAnimation })
          );
          expect(enemyService.chooseFirstEnemyForAction).toHaveBeenCalledTimes(
            1
          );
        });
      });
    });
  });
});
