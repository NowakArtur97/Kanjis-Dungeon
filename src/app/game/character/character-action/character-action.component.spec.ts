import { ComponentFixture, TestBed } from '@angular/core/testing';

import SpriteService from '../../services/sprite.service';
import CharacterType from '../enums/character-type.enum';
import { CharacterActionComponent } from './character-action.component';

describe('CharacterActionComponent', () => {
  let component: CharacterActionComponent;
  let fixture: ComponentFixture<CharacterActionComponent>;
  let spriteService: SpriteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterActionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterActionComponent);
    component = fixture.componentInstance;

    spriteService = TestBed.inject(SpriteService);

    spyOn(spriteService, 'getActionSprite');

    component.character = {
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
      action: {
        action: 'shield',
        value: 11,
      },
    };

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should get action sprite', () => {
      expect(spriteService.getActionSprite).toHaveBeenCalled();
    });
  });
});
