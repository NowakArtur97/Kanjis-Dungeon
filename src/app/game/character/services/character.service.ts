import { Injectable } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../models/character.model';

@Injectable({ providedIn: 'root' })
export default class CharacterService {
  private readonly MIN_TOP_OFFSET = 40;
  private readonly MAX_TOP_OFFSET = 55;

  setRandomTopOffset(character: Character): Character {
    const randomTopOffset = MathUtil.getRandomIntValue(
      this.MIN_TOP_OFFSET,
      this.MAX_TOP_OFFSET
    );
    const updatedCharacter: Character = cloneDeep(character);
    updatedCharacter.position = { x: 0, y: randomTopOffset };

    return updatedCharacter;
  }
}
