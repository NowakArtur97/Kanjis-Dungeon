import { Injectable } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

import CharacterAnimation from '../models/character-animation.model';

@Injectable({ providedIn: 'root' })
export default class SpriteService {
  private SPRITESHEET_VARIABLES = {
    spriteBaseSize: '--sprite-base-size',
    sizeMultiplier: '--sprite-size-multiplier',
  };
  private SPRITESHEET_CONSTANTS = {
    charactersSrc: '../../../../assets/characters/',
    statusesSrc: '../../../../assets/statuses/',
    actionsSrc: '../../../../assets/actions/',
    imageExtension: 'x.png',
    imagePathSeparator: '/',
    multiplierSeparator: '_',
    negativeImageOffset: -1,
  };
  private MEDIUM_SPRITESHEET_VARIABLES = {
    spriteBaseSize: '--medium-sprite-base-size',
    sizeMultiplier: '--medium-sprite-size-multiplier',
  };
  private SMALL_SPRITESHEET_VARIABLES = {
    spriteBaseSize: '--small-sprite-base-size',
    sizeMultiplier: '--small-sprite-size-multiplier',
  };

  getCharacterSprite(spriteName: string, spriteFolder: string): string {
    return this.getSprite(
      this.SPRITESHEET_CONSTANTS.charactersSrc +
        spriteFolder +
        this.SPRITESHEET_CONSTANTS.imagePathSeparator,
      spriteName,
      this.SPRITESHEET_VARIABLES.sizeMultiplier
    );
  }

  getStatusSprite(spriteName: string): string {
    return this.getSprite(
      this.SPRITESHEET_CONSTANTS.statusesSrc,
      spriteName,
      this.SMALL_SPRITESHEET_VARIABLES.sizeMultiplier
    );
  }

  getShieldSprite(): string {
    return this.getSprite(
      this.SPRITESHEET_CONSTANTS.actionsSrc +
        'shield' +
        this.SPRITESHEET_CONSTANTS.imagePathSeparator,
      'shield',
      this.SMALL_SPRITESHEET_VARIABLES.sizeMultiplier
    );
  }

  getActionSprite(spriteName: string): string {
    return this.getSprite(
      this.SPRITESHEET_CONSTANTS.actionsSrc +
        spriteName +
        this.SPRITESHEET_CONSTANTS.imagePathSeparator,
      spriteName,
      this.MEDIUM_SPRITESHEET_VARIABLES.sizeMultiplier
    );
  }

  private getSprite(
    spriteFolder: string,
    spriteName: string,
    sizeMultiplierVariable: string
  ): string {
    const sprite: string =
      spriteFolder +
      spriteName +
      this.SPRITESHEET_CONSTANTS.multiplierSeparator +
      CssUtil.getCSSVariable(sizeMultiplierVariable) +
      this.SPRITESHEET_CONSTANTS.imageExtension;
    return `url(${sprite}) 0 0 no-repeat`;
  }

  getAnimationSpriteOffset(animationOptions: CharacterAnimation): number {
    const spriteBaseSize = CssUtil.getCSSVariable(
      this.SPRITESHEET_VARIABLES.spriteBaseSize
    );
    // Get value without px unit
    const spriteBaseSizeAsNumber = +spriteBaseSize.substring(
      0,
      spriteBaseSize.length - 2
    );
    const sizeMultiplier = +CssUtil.getCSSVariable(
      this.SPRITESHEET_VARIABLES.sizeMultiplier
    );
    return (
      animationOptions.numberOfFrames *
      spriteBaseSizeAsNumber *
      sizeMultiplier *
      this.SPRITESHEET_CONSTANTS.negativeImageOffset
    );
  }
}
