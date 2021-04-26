import { Injectable } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

import CharacterAnimation from '../character/models/character-animation.model';

@Injectable({ providedIn: 'root' })
export default class AnimationService {
  private ANIMATION_VARIABLES = {
    spriteBaseSize: '--sprite-base-size',
    sizeMultiplier: '--sprite-size-multiplier',
  };
  private ANIMATION_CONSTANTS = {
    imagesSrc: '../../../../assets/characters/',
    imageExtension: 'x.png',
    imagePathSeparator: '/',
    multiplierSeparator: '_',
    negativeImageOffset: -1,
  };

  getSprite(
    characterName: string,
    animationOptions: CharacterAnimation
  ): string {
    const characterImage: string =
      this.ANIMATION_CONSTANTS.imagesSrc +
      characterName +
      this.ANIMATION_CONSTANTS.imagePathSeparator +
      animationOptions.spriteSheet +
      this.ANIMATION_CONSTANTS.multiplierSeparator +
      CssUtil.getCSSVariable(this.ANIMATION_VARIABLES.sizeMultiplier) +
      this.ANIMATION_CONSTANTS.imageExtension;

    return `url(${characterImage}) 0 0 no-repeat`;
  }

  getAnimationSpriteOffset(animationOptions: CharacterAnimation): number {
    const spriteBaseSize = CssUtil.getCSSVariable(
      this.ANIMATION_VARIABLES.spriteBaseSize
    );
    // Get value without px unit
    const spriteBaseSizeAsNumber = +spriteBaseSize.substring(
      0,
      spriteBaseSize.length - 2
    );
    const sizeMultiplier = +CssUtil.getCSSVariable(
      this.ANIMATION_VARIABLES.sizeMultiplier
    );
    return (
      animationOptions.numberOfFrames *
      spriteBaseSizeAsNumber *
      sizeMultiplier *
      this.ANIMATION_CONSTANTS.negativeImageOffset
    );
  }
}
