import { ComponentFixture, TestBed } from '@angular/core/testing';

import defaultPlayer from '../../player/player.data';
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

    component.character = defaultPlayer;

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should get status sprite', () => {
      expect(spriteService.getStatusSprite).toHaveBeenCalled();
    });
  });
});
