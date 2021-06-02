import { ComponentFixture, TestBed } from '@angular/core/testing';

import CharacterType from '../enums/character-type.enum';
import SpriteService from '../services/sprite.service';
import { CharacterStatusesComponent } from './character-statuses.component';

describe('CharacterStatusesComponent', () => {
  let component: CharacterStatusesComponent;
  let fixture: ComponentFixture<CharacterStatusesComponent>;
  let spriteService: SpriteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterStatusesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterStatusesComponent);
    component = fixture.componentInstance;
    spriteService = TestBed.inject(SpriteService);

    spyOn(spriteService, 'getStatusSprite');

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
      statuses: [
        {
          spriteSheet: 'book',
          remainingNumberOfActiveRounds: 3,
        },
      ],
    };

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should get status sprite', () => {
      expect(spriteService.getStatusSprite).toHaveBeenCalled();
    });
  });
});
