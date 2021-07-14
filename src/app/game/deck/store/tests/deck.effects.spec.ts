import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import * as QuizActions from '../../../../quiz/store/quiz.actions';
import * as EnemyActions from '../../../enemy/store/enemy.actions';
import * as PlayerActions from '../../../player/store/player.actions';
import * as GameActions from '../../../store/game.actions';
import { attackCard, defenceCard, powerCard } from '../../deck.data';
import DeckService from '../../services/deck.service';
import * as DeckActions from '../deck.actions';
import DeckEffects from '../deck.effects';
import { initialState } from '../deck.reducer';

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

  describe('with default store', () => {
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

    describe('changePhase$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(GameActions.chooseLevel);
      });

      it('should return a resetEnergy action', () => {
        deckEffects.changePhase$.subscribe((resultAction) => {
          expect(resultAction).toEqual(DeckActions.resetEnergy);
        });
      });
    });

    describe('increaseEnergyOnCorrectAnswer$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.addAnswer);
      });

      it('should return a changeEnergy action', () => {
        deckEffects.increaseEnergyOnCorrectAnswer$.subscribe((resultAction) => {
          expect(resultAction).toEqual(DeckActions.changeEnergy({ energy: 1 }));
        });
      });
    });

    describe('decreaseEnergyOnMistake$', () => {
      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(QuizActions.addMistake);
      });

      it('should return a changeEnergy action', () => {
        deckEffects.decreaseEnergyOnMistake$.subscribe((resultAction) => {
          expect(resultAction).toEqual(
            DeckActions.changeEnergy({ energy: -1 })
          );
        });
      });
    });
  });

  describe('with mocked store', () => {
    describe('useCard$', () => {
      describe('on Player', () => {
        const stateWithDefenceCard: Partial<AppStoreState> = {
          deck: {
            ...initialState,
            chosenCard: defenceCard,
          },
        };
        beforeEach(() =>
          TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [
              DeckEffects,
              provideMockStore({ initialState: stateWithDefenceCard }),
              {
                provide: Store,
                useClass: MockStore,
              },
              provideMockActions(() => actions$),
            ],
          })
        );

        beforeEach(() => {
          deckEffects = TestBed.inject(DeckEffects);
          deckService = TestBed.inject(DeckService);
        });

        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(PlayerActions.useCardOnPlayer);
        });

        it('should return a getCardsToHand action', () => {
          deckEffects.useCard$.subscribe((resultAction) => {
            expect(resultAction).toEqual(
              DeckActions.useCard({ cost: defenceCard.cost })
            );
          });
        });
      });

      describe('on Enemy', () => {
        const stateWithAttackCard: Partial<AppStoreState> = {
          deck: {
            ...initialState,
            chosenCard: attackCard,
          },
        };
        beforeEach(() =>
          TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [
              DeckEffects,
              provideMockStore({ initialState: stateWithAttackCard }),
              {
                provide: Store,
                useClass: MockStore,
              },
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

        beforeEach(() => {
          actions$ = new ReplaySubject(1);
          actions$.next(EnemyActions.useCardOnEnemy);
        });

        it('should return a getCardsToHand action', () => {
          deckEffects.useCard$.subscribe((resultAction) => {
            expect(resultAction).toEqual(
              DeckActions.useCard({ cost: attackCard.cost })
            );
          });
        });
      });
    });

    describe('getCardsToHand$', () => {
      const hand = [...allCards].splice(0, 6);
      const stateWithCards: Partial<AppStoreState> = {
        deck: {
          ...initialState,
          chosenCard: defenceCard,
          hand,
          allCards,
        },
      };
      beforeEach(() =>
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            DeckEffects,
            provideMockStore({ initialState: stateWithCards }),
            {
              provide: Store,
              useClass: MockStore,
            },
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

      beforeEach(() => {
        actions$ = new ReplaySubject(1);
        actions$.next(PlayerActions.startPlayerTurn);
        (deckService.getHand as jasmine.Spy).and.returnValue(hand);
      });

      it('should return a getCardsToHand actions', () => {
        deckEffects.startTurn$.subscribe((resultAction) => {
          expect(resultAction).toEqual(DeckActions.getCardsToHand({ hand }));
          expect(deckService.getHand).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
