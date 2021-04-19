import { Injectable } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

import AnimationOptions from '../models/animation-options.model';

@Injectable({ providedIn: 'root' })
export default class AnimationService {
  ANIMATION_VARIABLES = {
    sizeMultiplier: '--sprite-size-multiplier',
    image: '--sprite-image',
    numberOfFrames: '--sprite-number-of-frames',
    animationTimeInMiliseconds: '--sprite-animation-time',
    animationIterationCount: '--sprite-animation-iteration-count',
  };
  ANIMATION_CONSTANTS = {
    imagesSrc: '../../../../assets/characters/',
    imageExtension: 'x.png',
    multiplierSeparator: '_',
    animationTimeUnit: 'ms',
  };

  changeAnimation(animationOptions: AnimationOptions): void {
    const characterImage: string =
      this.ANIMATION_CONSTANTS.imagesSrc +
      animationOptions.image +
      this.ANIMATION_CONSTANTS.multiplierSeparator +
      CssUtil.getCSSVariable(this.ANIMATION_VARIABLES.sizeMultiplier) +
      this.ANIMATION_CONSTANTS.imageExtension;

    CssUtil.changeCSSVariable(
      this.ANIMATION_VARIABLES.image,
      `url(${characterImage})`
    );
    CssUtil.changeCSSVariable(
      this.ANIMATION_VARIABLES.numberOfFrames,
      animationOptions.numberOfFrames
    );
    CssUtil.changeCSSVariable(
      this.ANIMATION_VARIABLES.animationTimeInMiliseconds,
      animationOptions.animationTimeInMiliseconds +
        this.ANIMATION_CONSTANTS.animationTimeUnit
    );
    CssUtil.changeCSSVariable(
      this.ANIMATION_VARIABLES.animationIterationCount,
      animationOptions.animationIterationCount
    );
  }
}
