import { ComponentFixture, TestBed } from '@angular/core/testing';

import defaultPlayer from '../../player/player.data';
import Character from '../models/character.model';
import SpriteService from '../services/sprite.service';
import { burnedStatus } from './character-status.data';
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
  });

  describe('when initialize component', () => {
    it('with character with status should get status sprite', () => {
      const characterWithStatus: Character = {
        ...defaultPlayer,
        statuses: [burnedStatus],
      };
      component.character = characterWithStatus;

      fixture.detectChanges();
      component.ngOnInit();

      expect(spriteService.getStatusSprite).toHaveBeenCalled();
    });

    it('with character without any statuses should not get status sprite', () => {
      component.character = defaultPlayer;

      fixture.detectChanges();
      component.ngOnInit();

      expect(spriteService.getStatusSprite).not.toHaveBeenCalled();
    });
  });
});
