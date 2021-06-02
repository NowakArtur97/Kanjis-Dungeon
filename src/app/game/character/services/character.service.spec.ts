import { getTestBed, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import defaultPlayer from '../../player/player.data';
import Character from '../models/character.model';
import CharacterService from './character.service';

describe('characterService', () => {
  let injector: TestBed;
  let characterService: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CharacterService],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    characterService = injector.inject(CharacterService);
  });

  describe('when set characterExpected random top offset', () => {
    it('should set position', () => {
      const topOffset = 50;
      spyOn(MathUtil, 'getRandomIntValue').and.returnValue(topOffset);

      const characterExpected: Character = {
        ...defaultPlayer,
        position: { x: 0, y: topOffset },
      };
      const characterCharacterActual = characterService.setRandomTopOffset(
        defaultPlayer
      );

      expect(characterCharacterActual).toEqual(characterExpected);
      expect(characterCharacterActual.position.y).toBe(topOffset);
      expect(MathUtil.getRandomIntValue).toHaveBeenCalledTimes(1);
    });
  });
});
