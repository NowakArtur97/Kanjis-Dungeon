import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import { EnemyStoreState } from '../store/enemy.reducer';
import { EnemiesLayoutComponent } from './enemies-layout.component';

describe('EnemiesLayoutComponent', () => {
  let component: EnemiesLayoutComponent;
  let fixture: ComponentFixture<EnemiesLayoutComponent>;
  let store: Store<AppStoreState>;

  const initialState: EnemyStoreState = {
    enemies: [
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
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnemiesLayoutComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemiesLayoutComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spyOn(store, 'select').and.callFake(() => of(initialState));

    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
