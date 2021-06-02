import { ComponentFixture, TestBed } from '@angular/core/testing';

import CharacterType from '../enums/character-type.enum';
import SpriteService from '../services/sprite.service';
import { CharacterStatsComponent } from './character-stats.component';

describe('CharacterStatsComponent', () => {
  let component: CharacterStatsComponent;
  let fixture: ComponentFixture<CharacterStatsComponent>;
  let spriteService: SpriteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterStatsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterStatsComponent);
    component = fixture.componentInstance;

    spriteService = TestBed.inject(SpriteService);

    spyOn(spriteService, 'getShieldSprite');

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
    };

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should get shield sprite', () => {
      expect(spriteService.getShieldSprite).toHaveBeenCalled();
    });
  });
});
