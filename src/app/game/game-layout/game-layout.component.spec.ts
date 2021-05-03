import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../store/game.actions';
import { GameLayoutComponent } from './game-layout.component';

describe('GameLayoutComponent', () => {
  let component: GameLayoutComponent;
  let fixture: ComponentFixture<GameLayoutComponent>;
  let store: Store<AppStoreState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameLayoutComponent],
      imports: [StoreModule.forRoot({})],
      providers: [Store],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLayoutComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should dispatch chooseLevel action', () => {
      const level = 1;

      expect(store.dispatch).toHaveBeenCalledWith(
        GameActions.chooseLevel({ level })
      );
    });
  });
});
