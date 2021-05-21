import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import { DeckStoreState } from '../store/deck.reducer';
import { DeckEnergyComponent } from './deck-energy.component';

describe('DeckEnergyComponent', () => {
  let component: DeckEnergyComponent;
  let fixture: ComponentFixture<DeckEnergyComponent>;
  let store: Store<AppStoreState>;
  const initialState: DeckStoreState = {
    allCards: [],
    hand: [],
    chosenCard: null,
    numberOfCards: 6,

    remainingEnergy: 2,
    maxEnergy: 4,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckEnergyComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckEnergyComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spyOn(store, 'select').and.callFake(() => of(initialState));

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should select deck energy from store', () => {
      expect(store.select).toHaveBeenCalled();
    });
  });
});
