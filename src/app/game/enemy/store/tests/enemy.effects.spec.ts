import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import Character from 'src/app/game/character/models/character.model';

import * as GameActions from '../../../store/game.actions';
import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../../enemy.data';
import EnemyService from '../../services/enemy.service';
import * as EnemyActions from '../enemy.actions';
import EnemyEffects from '../enemy.effects';

describe('EnemyEffects', () => {
  let enemyEffects: EnemyEffects;
  let actions$: ReplaySubject<any>;
  let enemyService: EnemyService;

  const enemies: Character[] = [exampleEnemy1, exampleEnemy2, exampleEnemy3];
  const updatedEnemies: Character[] = [
    {
      ...exampleEnemy1,
      stats: {
        ...exampleEnemy1.stats,
        currentHealth: 70,
        damage: 12,
        currentShield: 10,
      },
    },
    {
      ...exampleEnemy2,
      stats: {
        ...exampleEnemy2.stats,
        currentHealth: 35,
        damage: 12,
        currentShield: 18,
      },
    },
    {
      ...exampleEnemy3,
      stats: {
        ...exampleEnemy3.stats,
        currentHealth: 30,
        currentShield: 6,
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
          useValue: jasmine.createSpyObj('enemyService', [
            'chooseEnemies',
            'updateEnemies',
          ]),
        },
      ],
    })
  );

  beforeEach(() => {
    enemyEffects = TestBed.inject(EnemyEffects);
    enemyService = TestBed.inject(EnemyService);
  });

  describe('setEnemies$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(GameActions.chooseLevel);
      (enemyService.chooseEnemies as jasmine.Spy).and.returnValue(enemies);
    });

    it('should return a setEnemies action', () => {
      enemyEffects.chooseEnemies$.subscribe((resultAction) => {
        expect(resultAction).toEqual(EnemyActions.setEnemies({ enemies }));
        expect(enemyService.chooseEnemies).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('useCardOnEnemy$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(EnemyActions.useCardOnEnemy);
      (enemyService.updateEnemies as jasmine.Spy).and.returnValue(
        updatedEnemies
      );
    });

    it('should return a setEnemies action', () => {
      enemyEffects.useCardOnEnemy$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          EnemyActions.setEnemies({ enemies: updatedEnemies })
        );
        expect(enemyService.updateEnemies).toHaveBeenCalledTimes(1);
      });
    });
  });
});
