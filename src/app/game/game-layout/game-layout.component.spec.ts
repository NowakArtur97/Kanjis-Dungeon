import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GameTurn from '../enums/game-turn.enum';
import * as GameActions from '../store/game.actions';
import { GameStoreState } from '../store/game.reducer';
import { GameLayoutComponent } from './game-layout.component';

describe('GameLayoutComponent', () => {
  let component: GameLayoutComponent;
  let fixture: ComponentFixture<GameLayoutComponent>;
  let store: Store<AppStoreState>;

  const initialState: GameStoreState = {
    level: 0,
    turn: GameTurn.PLAYER_TURN,
  };

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
    spyOn(store, 'select').and.callFake(() => of(initialState));

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

    it('should show quiz layout component', () => {
      expect(component.isPlayerTurn).toBe(true);
      expect(store.select).toHaveBeenCalled();
    });
  });
});
