import { ComponentFixture, TestBed } from '@angular/core/testing';

import { exampleEnemy1 } from '../../enemy/enemy.data';
import SpriteService from '../../services/sprite.service';
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

    component.character = exampleEnemy1;

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should get action sprite', () => {
      expect(spriteService.getActionSprite).toHaveBeenCalled();
    });
  });
});
