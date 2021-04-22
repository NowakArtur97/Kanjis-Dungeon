import { ElementRef, Injectable } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

import AnimationOptions from '../models/animation-options.model';

@Injectable({ providedIn: 'root' })
export default class AnimationService {
  ANIMATION_VARIABLES = {
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
    animationOptions: AnimationOptions
  ): void {
    const characterImage: string =
      this.ANIMATION_CONSTANTS.imagesSrc +
      animationOptions.image +
      this.ANIMATION_CONSTANTS.imagePathSeparator +
      animationOptions.image +
      this.ANIMATION_CONSTANTS.multiplierSeparator +
      CssUtil.getCSSVariable(this.ANIMATION_VARIABLES.sizeMultiplier) +
      this.ANIMATION_CONSTANTS.imageExtension;

    spriteImage.nativeElement.style.background = `url(${characterImage}) 0 0 no-repeat`;
    spriteImage.nativeElement.style.animationTimingFunction = `steps(${animationOptions.numberOfFrames})`;
    spriteImage.nativeElement.style.animationIterationCount =
      animationOptions.animationIterationCount;
    spriteImage.nativeElement.style.animationDuration =
      animationOptions.animationTimeInMiliseconds +
      this.ANIMATION_CONSTANTS.animationTimeUnit;
  }
}
