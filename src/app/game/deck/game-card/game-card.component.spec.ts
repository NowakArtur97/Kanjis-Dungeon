import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { JapaneseModule } from 'src/app/japanese/japanese.module';
import AppStoreState from 'src/app/store/app.state';

import { attackCard, defenceCard, powerCard } from '../deck.data';
import GameCard from '../models/game-card.model';
import * as DeckActions from '../store/deck.actions';
import { DeckStoreState, initialState } from '../store/deck.reducer';
import { GameCardComponent } from './game-card.component';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let store: Store<AppStoreState>;

  const allCards: GameCard[] = [attackCard, defenceCard, powerCard];
  const hand = [attackCard, defenceCard];
  const stateWithMaxEnergyAndChosenAttackCard: DeckStoreState = {
    ...initialState,
    allCards,
    hand,
    chosenCard: attackCard,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCardComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),

        JapaneseModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
  });

  describe('when choose card', () => {
    it('if player has enough energy should dispatch chooseCard action', () => {
      spyOn(store, 'select').and.callFake(() =>
        of(stateWithMaxEnergyAndChosenAttackCard)
      );

      fixture.detectChanges();
      component.card = attackCard;
      component.ngOnInit();

      component.onChooseCard();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        DeckActions.chooseCard({ chosenCard: attackCard })
      );
      expect(component.isChosen).toBe(true);
      expect(component.isAvailable).toBe(true);
    });

    it('if player has not enough energy should not dispatch chooseCard action', () => {
      const stateWithZeroEnergyAndChosenAttackCard: DeckStoreState = {
        ...stateWithMaxEnergyAndChosenAttackCard,
        remainingEnergy: 0,
      };
      spyOn(store, 'select').and.callFake(() =>
        of(stateWithZeroEnergyAndChosenAttackCard)
      );

      fixture.detectChanges();
      component.card = defenceCard;
      component.ngOnInit();

      component.onChooseCard();

      expect(store.select).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith(
        DeckActions.chooseCard({ chosenCard: attackCard })
      );
      expect(component.isChosen).toBe(false);
      expect(component.isAvailable).toBe(false);
    });
  });
});
