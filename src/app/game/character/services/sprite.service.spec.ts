import { getTestBed, TestBed } from '@angular/core/testing';
import CssUtil from 'src/app/common/utils/css.util';

import SpriteService from './sprite.service';

describe('spriteService', () => {
  let injector: TestBed;
  let spriteService: SpriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [SpriteService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    spriteService = injector.inject(SpriteService);
  });

  describe('when get character sprite', () => {
    it('should return character sprite', () => {
      spyOn(CssUtil, 'getCSSVariable').and.returnValue('7');

      const characterSpriteExpected =
        'url(../../../../assets/characters/fight/character_7x.png) 0 0 no-repeat';
      const characterSpriteActual = spriteService.getCharacterSprite(
        'character',
        'fight'
      );

      expect(characterSpriteActual).toBe(characterSpriteExpected);
      expect(CssUtil.getCSSVariable).toHaveBeenCalledTimes(1);
    });
  });

  describe('when get status sprite', () => {
    it('should return status sprite', () => {
      spyOn(CssUtil, 'getCSSVariable').and.returnValue('2');

      const statusSpriteExpected =
        'url(../../../../assets/statuses/status_2x.png) 0 0 no-repeat';
      const statusSpriteActual = spriteService.getStatusSprite('status');

      expect(statusSpriteActual).toBe(statusSpriteExpected);
      expect(CssUtil.getCSSVariable).toHaveBeenCalledTimes(1);
    });
  });

  describe('when get shield sprite', () => {
    it('should return shield sprite', () => {
      spyOn(CssUtil, 'getCSSVariable').and.returnValue('4');

      const shieldSpriteExpected =
        'url(../../../../assets/actions/shield/shield_4x.png) 0 0 no-repeat';
      const shieldSpriteActual = spriteService.getShieldSprite();

      expect(shieldSpriteActual).toBe(shieldSpriteExpected);
      expect(CssUtil.getCSSVariable).toHaveBeenCalledTimes(1);
    });
  });

  describe('when get action sprite', () => {
    it('should return action sprite', () => {
      spyOn(CssUtil, 'getCSSVariable').and.returnValue('3');
      const actionSpriteExpected =
        'url(../../../../assets/actions/attack/attack_3x.png) 0 0 no-repeat';
      const actionSpriteActual = spriteService.getActionSprite('attack');

      expect(actionSpriteActual).toBe(actionSpriteExpected);
      expect(CssUtil.getCSSVariable).toHaveBeenCalledTimes(1);
    });
  });
});
