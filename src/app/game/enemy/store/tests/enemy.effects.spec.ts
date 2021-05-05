import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../../../store/game.actions';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let enemyService: EnemyService;
  const enemies = [
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 70,
        currentHealth: 70,
        maxDamage: 12,
        damage: 10,
        currentShield: 0,
        isEnemy: true,
      },
      animations: [
        {
          spriteSheet: 'idle',
          numberOfFrames: 4,
          animationTimeInMiliseconds: 600,
          animationIterationCount: 'Infinite',
        },
      ],
      statuses: [
        {
          spriteSheet: 'book',
          remainingNumberOfActiveRounds: 3,
        },
      ],
      action: {
        action: 'sword',
        value: 5,
      },
    },
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 60,
        currentHealth: 15,
        maxDamage: 12,
        damage: 10,
        currentShield: 8,
        isEnemy: true,
      },
      animations: [
        {
          spriteSheet: 'idle',
          numberOfFrames: 4,
          animationTimeInMiliseconds: 600,
          animationIterationCount: 'Infinite',
        },
      ],
      statuses: [
        {
          spriteSheet: 'heart',
          remainingNumberOfActiveRounds: 2,
        },
        {
          spriteSheet: 'book',
          remainingNumberOfActiveRounds: 3,
        },
      ],
      action: {
        action: 'sword',
        value: 5,
      },
    },
    {
      name: 'goblin-archer',
      stats: {
        maxHealth: 50,
        currentHealth: 20,
        damage: 10,
        maxDamage: 12,
        currentShield: 2,
        isEnemy: true,
      },
      animations: [
        {
          spriteSheet: 'idle',
          numberOfFrames: 4,
          animationTimeInMiliseconds: 600,
          animationIterationCount: 'Infinite',
        },
      ],
      statuses: [
        {
          spriteSheet: 'heart',
          remainingNumberOfActiveRounds: 2,
        },
      ],
      action: {
        action: 'shield',
        value: 11,
      },
    },
  ];

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        EnemyEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: EnemyService,
          useValue: jasmine.createSpyObj('enemyService', ['chooseEnemies']),
        },
      ],
    })
  );

  beforeEach(() => {
    enemyEffects = TestBed.inject(EnemyEffects);
    store = TestBed.inject(Store);
    enemyService = TestBed.inject(EnemyService);
  });

  describe('chooseEnemies$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(GameActions.chooseLevel);
      (enemyService.chooseEnemies as jasmine.Spy).and.returnValue(enemies);
    });

    it('should return a chooseEnemies action', () => {
      enemyEffects.chooseEnemies$.subscribe((resultAction) => {
        expect(resultAction).toEqual(EnemyActions.chooseEnemies({ enemies }));
        expect(enemyService.chooseEnemies).toHaveBeenCalledTimes(1);
      });
    });
  });
});
