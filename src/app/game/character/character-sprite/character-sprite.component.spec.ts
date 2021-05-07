import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import { attackCard, powerCard } from '../../deck/deck.data';
import { DeckStoreState } from '../../deck/store/deck.reducer';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import * as PlayerActions from '../../player/store/player.actions';
import SpriteService from '../../services/sprite.service';
import CharacterType from '../enums/character-type.enum';
import Character from '../models/character.model';
import { CharacterSpriteComponent } from './character-sprite.component';

describe('CharacterSpriteComponent', () => {
  let component: CharacterSpriteComponent;
  let fixture: ComponentFixture<CharacterSpriteComponent>;
  let store: Store<AppStoreState>;
  let spriteService: SpriteService;

  const stateWithAttackTypeCard: Partial<DeckStoreState> = {
    chosenCard: attackCard,
  };
  const stateWithPowerTypeCard: Partial<DeckStoreState> = {
    chosenCard: powerCard,
  };
  const playerCharacter: Character = {
    name: 'example-character',
    stats: {
      currentHealth: 100,
      maxHealth: 100,
      damage: 20,
      maxDamage: 22,
      currentShield: 10,
      type: CharacterType.PLAYER,
    },
    animations: [
      {
        spriteSheet: 'idle',
        numberOfFrames: 4,
        animationTimeInMiliseconds: 600,
        animationIterationCount: 'Infinite',
      },
    ],
    statuses: [],
  };
  const enemyCharacter: Character = {
    name: 'goblin-archer',
    stats: {
      maxHealth: 70,
      currentHealth: 70,
      maxDamage: 12,
      damage: 10,
      currentShield: 0,
      type: CharacterType.ENEMY,
    },
    animations: [
      {
        spriteSheet: 'idle',
        numberOfFrames: 4,
        animationTimeInMiliseconds: 600,
        animationIterationCount: 'Infinite',
      },
    ],
    statuses: [],
    action: {
      action: 'sword',
      value: 5,
    },
  };

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
    it('should get animation sprite offset', () => {
      spyOn(spriteService, 'getAnimationSpriteOffset');

      fixture.detectChanges();

      component.character = playerCharacter;
      component.ngOnInit();

      expect(spriteService.getAnimationSpriteOffset).toHaveBeenCalled();
    });
  });

  describe('when card chosen', () => {
    describe('with Attack card type', () => {
      beforeEach(() => {
        spyOn(store, 'select').and.callFake(() => of(stateWithAttackTypeCard));

        fixture.detectChanges();
      });

      it('and Player character should not select sprite', () => {
        component.character = playerCharacter;
        component.ngOnInit();

        expect(component.isSelectable).toBe(false);
        expect(store.select).toHaveBeenCalled();
      });

      it('and Enemy character should select sprite', () => {
        component.character = enemyCharacter;
        component.ngOnInit();

        expect(component.isSelectable).toBe(true);
        expect(store.select).toHaveBeenCalled();
      });
    });

    describe('with not Attack card type', () => {
      beforeEach(() => {
        spyOn(store, 'select').and.callFake(() => of(stateWithPowerTypeCard));

        fixture.detectChanges();
      });

      it('and Player character should select sprite', () => {
        component.character = playerCharacter;
        component.ngOnInit();

        expect(component.isSelectable).toBe(true);
        expect(store.select).toHaveBeenCalled();
      });

      it('and Enemy character should not select sprite', () => {
        component.character = enemyCharacter;
        component.ngOnInit();

        expect(component.isSelectable).toBe(false);
        expect(store.select).toHaveBeenCalled();
      });
    });

    describe('when character chosen', () => {
      beforeEach(() => {
        spyOn(store, 'dispatch');
      });

      it('is Player should dispatch useCardOnPlayer action', () => {
        spyOn(store, 'select').and.callFake(() => of(stateWithPowerTypeCard));
        fixture.detectChanges();

        component.character = playerCharacter;
        component.ngOnInit();
        component.onChooseCharacter();

        expect(store.dispatch).toHaveBeenCalledWith(
          PlayerActions.useCardOnPlayer()
        );
      });

      it('is Enemy should dispatch useCardOnEnemy action', () => {
        spyOn(store, 'select').and.callFake(() => of(stateWithAttackTypeCard));
        fixture.detectChanges();

        component.character = enemyCharacter;
        component.ngOnInit();
        component.onChooseCharacter();

        expect(store.dispatch).toHaveBeenCalledWith(
          EnemyActions.useCardOnEnemy({ enemy: component.character })
        );
      });
    });
  });
});
