import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import defaultPlayer from '../player.data';
import { PlayerStoreState } from '../store/player.reducer';
import { PlayerLayoutComponent } from './player-layout.component';

describe('PlayerLayoutComponent', () => {
  let component: PlayerLayoutComponent;
  let fixture: ComponentFixture<PlayerLayoutComponent>;
  let store: Store<AppStoreState>;

  const initialState: PlayerStoreState = {
    player: defaultPlayer,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerLayoutComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLayoutComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spyOn(store, 'select').and.callFake(() => of(initialState));

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should select player from store', () => {
      expect(store.select).toHaveBeenCalled();
    });
  });
});
