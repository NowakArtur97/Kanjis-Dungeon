import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import { attackCard, powerCard } from '../../deck/deck.data';
import { DeckStoreState, initialState as deckInitialState } from '../../deck/store/deck.reducer';
import { exampleEnemy1 } from '../../enemy/enemy.data';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import defaultPlayer from '../../player/player.data';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import { GameStoreState, initialState as gameInitialState } from '../../store/game.reducer';
import Character from '../models/character.model';
import SpriteService from '../services/sprite.service';
import { CharacterSpriteComponent } from './character-sprite.component';

describe('CharacterSpriteComponent', () => {
  let component: CharacterSpriteComponent;
  let fixture: ComponentFixture<CharacterSpriteComponent>;
  let store: Store<AppStoreState>;
  let spriteService: SpriteService;

  const stateWithAttackTypeCard: Partial<DeckStoreState> = {
    ...deckInitialState,
    chosenCard: attackCard,
  };
  const stateWithPowerTypeCard: Partial<DeckStoreState> = {
    ...deckInitialState,
    chosenCard: powerCard,
  };
  const stateWithAnimation: Partial<GameStoreState> = {
    ...gameInitialState,
    playedAnimation: {
      character: defaultPlayer,
      animationName: attackCard.animationName,
    },
  };

  const playerCharacter: Character = { ...defaultPlayer, id: 0 };
  const enemyCharacter: Character = { ...exampleEnemy1, id: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterSpriteComponent],
      imports: [StoreModule.forRoot({}), BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpriteComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spriteService = TestBed.inject(SpriteService);
  });

  describe('when initialize component', () => {
    it('should set animation sprite', () => {
      spyOn(spriteService, 'getAnimationSpriteOffset').and.callThrough();
      spyOn(spriteService, 'getCharacterSprite').and.callThrough();
      spyOn(spriteService, 'getSpriteSize').and.callThrough();
      spyOn(store, 'select').and.callFake((selector) => {
        if (selector === 'deck') {
          return of(stateWithAttackTypeCard);
        } else if (selector === 'game') {
          return of(stateWithAnimation);
        }
      });

      fixture.detectChanges();

      component.character = playerCharacter;
      component.ngOnInit();
      component.ngAfterViewChecked();

      expect(spriteService.getAnimationSpriteOffset).toHaveBeenCalled();
      expect(spriteService.getCharacterSprite).toHaveBeenCalled();
      expect(spriteService.getSpriteSize).toHaveBeenCalled();
      expect(store.select).toHaveBeenCalled();
    });
  });

  describe('when card chosen', () => {
    describe('with Attack card type', () => {
      beforeEach(() => {
        spyOn(store, 'select').and.callFake((selector) => {
          if (selector === 'deck') {
            return of(stateWithAttackTypeCard);
          } else if (selector === 'game') {
            return of(stateWithAnimation);
          }
        });

        fixture.detectChanges();
      });

      it('and Player character should not select sprite', () => {
        component.character = playerCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();

        expect(component.isSelectable).toBe(false);
        expect(store.select).toHaveBeenCalled();
      });

      it('and Enemy character should select sprite', () => {
        component.character = enemyCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();

        expect(component.isSelectable).toBe(true);
        expect(store.select).toHaveBeenCalled();
      });
    });

    describe('with not Attack card type', () => {
      beforeEach(() => {
        spyOn(store, 'select').and.callFake((selector) => {
          if (selector === 'deck') {
            return of(stateWithPowerTypeCard);
          } else if (selector === 'game') {
            return of(stateWithAnimation);
          }
        });

        fixture.detectChanges();
      });

      it('and Player character should select sprite', () => {
        component.character = playerCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();

        expect(component.isSelectable).toBe(true);
        expect(store.select).toHaveBeenCalled();
      });

      it('and Enemy character should not select sprite', () => {
        component.character = enemyCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();

        expect(component.isSelectable).toBe(false);
        expect(store.select).toHaveBeenCalled();
      });
    });

    describe('when character chosen', () => {
      beforeEach(() => {
        spyOn(store, 'dispatch');
      });

      it('is Player should dispatch useCardOnPlayer action', () => {
        spyOn(store, 'select').and.callFake((selector) => {
          if (selector === 'deck') {
            return of(stateWithPowerTypeCard);
          } else if (selector === 'game') {
            return of(stateWithAnimation);
          }
        });
        fixture.detectChanges();

        component.character = playerCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();
        component.onChooseCharacter();

        expect(store.dispatch).toHaveBeenCalledWith(
          PlayerActions.useCardOnPlayer()
        );
      });

      it('is Player and chosen card doesnt affect Player should not dispatch useCardOnPlayer action', () => {
        spyOn(store, 'select').and.callFake((selector) => {
          if (selector === 'deck') {
            return of(stateWithAttackTypeCard);
          } else if (selector === 'game') {
            return of(stateWithAnimation);
          }
        });
        fixture.detectChanges();

        component.character = playerCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();
        component.onChooseCharacter();

        expect(store.dispatch).not.toHaveBeenCalledWith(
          PlayerActions.useCardOnPlayer()
        );
      });

      it('is Enemy should dispatch useCardOnEnemy action', () => {
        spyOn(store, 'select').and.callFake((selector) => {
          if (selector === 'deck') {
            return of(stateWithAttackTypeCard);
          } else if (selector === 'game') {
            return of(stateWithAnimation);
          }
        });
        fixture.detectChanges();

        component.character = enemyCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();
        component.onChooseCharacter();

        expect(store.dispatch).toHaveBeenCalledWith(
          EnemyActions.useCardOnEnemy({ enemy: component.character })
        );
      });

      it('is Enemy and chosen card doesnt affect Enemy should not dispatch useCardOnEnemy action', () => {
        spyOn(store, 'select').and.callFake((selector) => {
          if (selector === 'deck') {
            return of(stateWithPowerTypeCard);
          } else if (selector === 'game') {
            return of(stateWithAnimation);
          }
        });
        fixture.detectChanges();

        component.character = enemyCharacter;
        component.ngOnInit();
        component.ngAfterViewChecked();
        component.onChooseCharacter();

        expect(store.dispatch).not.toHaveBeenCalledWith(
          EnemyActions.useCardOnEnemy({ enemy: component.character })
        );
      });
    });
  });

  describe('when finish action animation', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('with character action animation played should dispatch finishCharacterAnimation action', () => {
      spyOn(spriteService, 'getAnimationSpriteOffset').and.callThrough();
      spyOn(spriteService, 'getCharacterSprite').and.callThrough();
      spyOn(spriteService, 'getSpriteSize').and.callThrough();
      spyOn(store, 'select').and.callFake((selector) => {
        if (selector === 'deck') {
          return of(stateWithAttackTypeCard);
        } else if (selector === 'game') {
          return of(stateWithAnimation);
        }
      });

      fixture.detectChanges();

      component.character = playerCharacter;
      component.ngOnInit();
      component.ngAfterViewChecked();

      const eventExpected = { toState: 'firstFrame' };
      component.onEndAnimation(eventExpected);

      expect(store.dispatch).toHaveBeenCalledWith(
        GameActions.finishCharacterAnimation()
      );
      expect(spriteService.getAnimationSpriteOffset).toHaveBeenCalled();
      expect(spriteService.getCharacterSprite).toHaveBeenCalled();
      expect(spriteService.getSpriteSize).toHaveBeenCalled();
      expect(store.select).toHaveBeenCalled();
    });

    it('with some other character action animation played should not dispatch finishCharacterAnimation action', () => {
      spyOn(spriteService, 'getAnimationSpriteOffset').and.callThrough();
      spyOn(spriteService, 'getCharacterSprite').and.callThrough();
      spyOn(spriteService, 'getSpriteSize').and.callThrough();
      spyOn(store, 'select').and.callFake((selector) => {
        if (selector === 'deck') {
          return of(stateWithAttackTypeCard);
        } else if (selector === 'game') {
          return of(stateWithAnimation);
        }
      });

      fixture.detectChanges();

      component.character = enemyCharacter;
      component.ngOnInit();
      component.ngAfterViewChecked();

      const eventExpected = { toState: 'firstFrame' };
      component.onEndAnimation(eventExpected);

      expect(store.dispatch).not.toHaveBeenCalledWith(
        GameActions.finishCharacterAnimation()
      );
      expect(spriteService.getAnimationSpriteOffset).toHaveBeenCalled();
      expect(spriteService.getCharacterSprite).toHaveBeenCalled();
      expect(spriteService.getSpriteSize).toHaveBeenCalled();
      expect(store.select).toHaveBeenCalled();
    });
  });
});
