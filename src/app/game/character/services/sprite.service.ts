import { Injectable } from '@angular/core';
import CssUtil from 'src/app/common/utils/css.util';

import CharacterAnimation from '../models/character-animation.model';

@Injectable({ providedIn: 'root' })
export default class SpriteService {
  private readonly SHIELD_SPRITE_NAME = 'defence';
  private readonly SPRITE_SIZE_MULTIPLIER_VARIABLE = '--sprite-size-multiplier';
  private readonly SPRITESHEET_CONSTANTS = {
    charactersSrc: '../../../../assets/characters/',
    statusesSrc: '../../../../assets/statuses/',
    actionsSrc: '../../../../assets/actions/',
    imageExtension: 'x.png',
    imagePathSeparator: '/',
    multiplierSeparator: '_',
    negativeImageOffset: -1,
  };
  private readonly MEDIUM_SPRITESHEET_VARIABLES = {
    spriteBaseSize: '--medium-sprite-base-size',
    sizeMultiplier: '--medium-sprite-size-multiplier',
  };
  private readonly SMALL_SPRITESHEET_VARIABLES = {
    spriteBaseSize: '--small-sprite-base-size',
    sizeMultiplier: '--small-sprite-size-multiplier',
  };

  getCharacterSprite(spriteName: string, spriteFolder: string): string {
    return this.getSprite(
      this.SPRITESHEET_CONSTANTS.charactersSrc +
        spriteFolder +
        this.SPRITESHEET_CONSTANTS.imagePathSeparator,
      spriteName,
      this.SPRITE_SIZE_MULTIPLIER_VARIABLE
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
        this.SHIELD_SPRITE_NAME +
        this.SPRITESHEET_CONSTANTS.imagePathSeparator,
      this.SHIELD_SPRITE_NAME,
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

  getSpriteSize(
    animationOptions: CharacterAnimation
  ): { width: number; height: number } {
    const sizeMultiplier = +CssUtil.getCSSVariable(
      this.SPRITE_SIZE_MULTIPLIER_VARIABLE
    );
    return {
      width: animationOptions.spriteWidth * sizeMultiplier,
      height: animationOptions.spriteHeight * sizeMultiplier,
    };
  }

  getAnimationSpriteOffset(animationOptions: CharacterAnimation): number {
    const sizeMultiplier = +CssUtil.getCSSVariable(
      this.SPRITE_SIZE_MULTIPLIER_VARIABLE
    );
    return (
      animationOptions.numberOfFrames *
      animationOptions.spriteWidth *
      sizeMultiplier *
      this.SPRITESHEET_CONSTANTS.negativeImageOffset
    );
  }
}
