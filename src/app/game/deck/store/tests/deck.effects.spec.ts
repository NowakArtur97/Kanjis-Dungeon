import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';

import * as PlayerActions from '../../../player/store/player.actions';
import * as GameActions from '../../../store/game.actions';
import { attackCard, defenceCard, powerCard } from '../../deck.data';
import DeckService from '../../services/deck.service';
import * as DeckActions from '../deck.actions';
import DeckEffects from '../deck.effects';

describe('DeckEffects', () => {
  let deckEffects: DeckEffects;
  let actions$: ReplaySubject<any>;
  let deckService: DeckService;

  const allCards = [
    attackCard,
    defenceCard,
    powerCard,
    attackCard,
    defenceCard,
    powerCard,
    attackCard,
    defenceCard,
    powerCard,
  ];
  const hand = [...allCards].splice(0, 6);

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

  describe('getCardsToHand$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(PlayerActions.startPlayerTurn);
      (deckService.getHand as jasmine.Spy).and.returnValue(hand);
    });

    it('should return a getCardsToHand action', () => {
      deckEffects.getCardsToHand$.subscribe((resultAction) => {
        expect(resultAction).toEqual(DeckActions.getCardsToHand({ hand }));
        expect(deckService.getHand).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('useCard$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(PlayerActions.useCardOnPlayer);
    });

    it('should return a getCardsToHand action', () => {
      deckEffects.useCard$.subscribe((resultAction) => {
        expect(resultAction).toEqual(DeckActions.useCard({ cost: 0 }));
      });
    });
  });

  describe('endPlayerTurn$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(DeckActions.useCard);
    });

    it('should return a changeTurn action if Player does not have more energy', () => {
      deckEffects.endPlayerTurn$.subscribe((resultAction) => {
        expect(resultAction).toEqual(GameActions.changeTurn());
      });
    });
  });
});
