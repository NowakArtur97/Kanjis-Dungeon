import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { JapaneseModule } from 'src/app/japanese/japanese.module';
import AppStoreState from 'src/app/store/app.state';

import GameCardType from '../enums/game-card-type.enum';
import * as DeckActions from '../store/deck.actions';
import { GameCardComponent } from './game-card.component';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let store: Store<AppStoreState>;

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
    it('should dispatch chooseCard action', () => {
      const chosenCard = {
        name: 'Attack',
        cost: 2,
        type: GameCardType.ATTACK,
        description: 'attack',
      };
      component.card = chosenCard;
      component.onChooseCard();

      expect(store.dispatch).toHaveBeenCalledWith(
        DeckActions.chooseCard({ chosenCard })
      );
    });
  });
});
