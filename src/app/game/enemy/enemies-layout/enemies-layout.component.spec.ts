import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import { exampleEnemy1, exampleEnemy2, exampleEnemy3 } from '../enemy.data';
import { EnemyStoreState } from '../store/enemy.reducer';
import { EnemiesLayoutComponent } from './enemies-layout.component';

describe('EnemiesLayoutComponent', () => {
  let component: EnemiesLayoutComponent;
  let fixture: ComponentFixture<EnemiesLayoutComponent>;
  let store: Store<AppStoreState>;

  const initialState: EnemyStoreState = {
    enemies: [exampleEnemy1, exampleEnemy2, exampleEnemy3],
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

  describe('when initialize component', () => {
    it('should select enemies from store', () => {
      expect(store.select).toHaveBeenCalled();
    });
  });
});
