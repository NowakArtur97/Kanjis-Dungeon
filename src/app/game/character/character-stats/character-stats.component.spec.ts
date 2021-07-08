import { ComponentFixture, TestBed } from '@angular/core/testing';

import defaultPlayer from '../../player/player.data';
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

    component.character = defaultPlayer;

    fixture.detectChanges();
    component.ngOnChanges();
  });

  describe('when initialize component', () => {
    it('should get shield sprite', () => {
      expect(spriteService.getShieldSprite).toHaveBeenCalled();
    });
  });
});
