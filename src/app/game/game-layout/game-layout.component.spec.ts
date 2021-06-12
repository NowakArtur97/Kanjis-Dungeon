import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GamePhase from '../enums/game-phase.enum';
import * as GameActions from '../store/game.actions';
import { GameStoreState, initialState } from '../store/game.reducer';
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
  });

  describe('when initialize component with quiz phase', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
      spyOn(store, 'select').and.callFake(() => of(initialState));

      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should dispatch chooseLevel action', () => {
      const level = 1;

      expect(store.dispatch).toHaveBeenCalledWith(
        GameActions.chooseLevel({ level })
      );
    });

    it('should show quiz layout component', () => {
      expect(component.isQuizPhase).toBe(true);
      expect(store.select).toHaveBeenCalled();
    });
  });

  describe('when initialize component with game phase', () => {
    beforeEach(() => {
      const stateWithGamePhase: GameStoreState = {
        ...initialState,
        phase: GamePhase.BATTLE,
      };

      spyOn(store, 'dispatch');
      spyOn(store, 'select').and.callFake(() => of(stateWithGamePhase));

      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should dispatch chooseLevel action', () => {
      const level = 1;

      expect(store.dispatch).toHaveBeenCalledWith(
        GameActions.chooseLevel({ level })
      );
    });

    it('should show quiz layout component', () => {
      expect(component.isQuizPhase).toBe(false);
      expect(store.select).toHaveBeenCalled();
    });
  });
});
