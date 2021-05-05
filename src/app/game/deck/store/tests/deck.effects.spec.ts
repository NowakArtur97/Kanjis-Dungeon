import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../../../store/game.actions';
import GameCardType from '../../enums/game-card-type.enum';
import DeckService from '../../services/deck.service';
import * as DeckActions from '../deck.actions';
import DeckEffects from '../deck.effects';
import { DeckStoreState } from '../deck.reducer';

describe('DeckEffects', () => {
  let deckEffects: DeckEffects;
  let actions$: ReplaySubject<any>;
  let store: Store<AppStoreState>;
  let deckService: DeckService;
  const allCards = [
    {
      name: 'Attack',
      cost: 2,
      type: GameCardType.ATTACK,
      description: 'attack',
    },
    {
      name: 'Defence',
      cost: 2,
      type: GameCardType.SKILL,
      description: 'defence',
    },
    {
      name: 'Power',
      cost: 2,
      type: GameCardType.POWER,
      description: 'power',
    },
    {
      name: 'Attack',
      cost: 2,
      type: GameCardType.ATTACK,
      description: 'attack',
    },
    {
      name: 'Defence',
      cost: 2,
      type: GameCardType.SKILL,
      description: 'defence',
    },
    {
      name: 'Power',
      cost: 2,
      type: GameCardType.POWER,
      description: 'power',
    },
    {
      name: 'Attack',
      cost: 2,
      type: GameCardType.ATTACK,
      description: 'attack',
    },
    {
      name: 'Defence',
      cost: 2,
      type: GameCardType.SKILL,
      description: 'defence',
    },
    {
      name: 'Power',
      cost: 2,
      type: GameCardType.POWER,
      description: 'power',
    },
  ];
  const hand = [...allCards].splice(0, 6);
  const stateWithCards: DeckStoreState = {
    allCards,
    hand: [],
    chosenCard: null,
    numberOfCards: 6,
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        DeckEffects,
        Store,
        provideMockActions(() => actions$),
        {
          provide: DeckService,
          useValue: jasmine.createSpyObj('deckService', [
            'getCards',
            'getHand',
          ]),
        },
      ],
    })
  );

  beforeEach(() => {
    deckEffects = TestBed.inject(DeckEffects);
    store = TestBed.inject(Store);
    deckService = TestBed.inject(DeckService);
  });

  describe('setAllCards$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(GameActions.chooseLevel);
      (deckService.getCards as jasmine.Spy).and.returnValue(allCards);
    });

    it('should return a setAllCards action', () => {
      deckEffects.setAllCards$.subscribe((resultAction) => {
        expect(resultAction).toEqual(DeckActions.setAllCards({ allCards }));
        expect(deckService.getCards).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('setAllCards$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(DeckActions.setAllCards);
      (deckService.getHand as jasmine.Spy).and.returnValue(hand);
    });

    it('should return a getCardsToHand action', () => {
      deckEffects.getCardsToHand$.subscribe((resultAction) => {
        expect(resultAction).toEqual(DeckActions.getCardsToHand({ hand }));
        expect(deckService.getHand).toHaveBeenCalledTimes(1);
      });
    });
  });
});
