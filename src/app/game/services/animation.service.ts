import { ElementRef, Injectable } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

import CharacterAnimation from '../character/models/character-animation.model';

@Injectable({ providedIn: 'root' })
export default class AnimationService {
  ANIMATION_VARIABLES = {
    spriteBaseSize: '--sprite-base-size',
    sizeMultiplier: '--sprite-size-multiplier',
  };
  ANIMATION_CONSTANTS = {
    imagesSrc: '../../../../assets/characters/',
    imageExtension: 'x.png',
    imagePathSeparator: '/',
    multiplierSeparator: '_',
    animationTimeUnit: 'ms',
  };

  changeAnimation(
    spriteImage: ElementRef,
    animationOptions: CharacterAnimation
  ): void {
    const characterImage: string =
      this.ANIMATION_CONSTANTS.imagesSrc +
      animationOptions.imageName +
      this.ANIMATION_CONSTANTS.imagePathSeparator +
      animationOptions.imageName +
      this.ANIMATION_CONSTANTS.multiplierSeparator +
      CssUtil.getCSSVariable(this.ANIMATION_VARIABLES.sizeMultiplier) +
      this.ANIMATION_CONSTANTS.imageExtension;

    spriteImage.nativeElement.style.background = `url(${characterImage}) 0 0 no-repeat`;
    // spriteImage.nativeElement.style.animationTimingFunction = `steps(${animationOptions.numberOfFrames})`;
    // spriteImage.nativeElement.style.animationIterationCount =
    // animationOptions.animationIterationCount;
    // spriteImage.nativeElement.style.animationDuration =
    // animationOptions.animationTimeInMiliseconds +
    // this.ANIMATION_CONSTANTS.animationTimeUnit;
  }

  getAnimationSpriteOffset(animationOptions: CharacterAnimation): number {
    const spriteBaseSize = CssUtil.getCSSVariable(
      this.ANIMATION_VARIABLES.spriteBaseSize
    );
    const spriteBaseSizeAsNumber = +spriteBaseSize.substring(
      0,
      spriteBaseSize.length - 2
    );
    return (
      animationOptions.numberOfFrames *
      spriteBaseSizeAsNumber *
      +CssUtil.getCSSVariable(this.ANIMATION_VARIABLES.sizeMultiplier) *
      -1
    );
  }
}
