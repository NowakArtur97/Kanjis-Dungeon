import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import cloneDeep from 'lodash/cloneDeep';
import { Subscription } from 'rxjs';
import CssUtil from 'src/app/common/utils/css.util';
import AppStoreState from 'src/app/store/app.state';

import GameCardType from '../../deck/enums/game-card-type.enum';
import { DeckStoreState } from '../../deck/store/deck.reducer';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
import CharacterActionType from '../enums/character-action-type.enum';
import CharacterType from '../enums/character-type.enum';
import CharacterAnimation from '../models/character-animation.model';
import CharacterPlayedAnimation from '../models/character-played-animation.model';
import Character from '../models/character.model';
import SpriteService from '../services/sprite.service';

@Component({
  selector: 'app-character-sprite',
  templateUrl: './character-sprite.component.html',
  styleUrls: ['./character-sprite.component.css'],
  animations: [
    trigger('animate', [
      state('firstFrame', style({ backgroundPosition: '0' })),
      state('lastFrame', style({ backgroundPosition: '{{spriteOffset}}' }), {
        params: { spriteOffset: 0 },
      }),
      transition(
        'firstFrame => lastFrame',
        animate('{{animationDuration}} {{animationSteps}}'),
        {
          params: { animationSteps: '', animationDuration: '' },
        }
      ),
    ]),
  ],
})
export class CharacterSpriteComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  private readonly FIRST_FRAME_STATE = 'firstFrame';
  private readonly LAST_FRAME_STATE = 'lastFrame';
  private readonly ANIMATION_DURATION_UNIT = 'ms';
  private readonly SPRITE_TIME_OFFSET = 100;
  private readonly ACTION_STYLES = { position: 'fixed', zIndex: '2' };
  private readonly DEFAULT_STYLES = { position: 'static', zIndex: '1' };
  private readonly SPRITE_SIZE_MULTIPLIER_VARIABLE = '--sprite-size-multiplier';

  @Input() character: Character;
  private playedAnimation: CharacterPlayedAnimation;
  private chosenCardSubscription$: Subscription;
  private playedAnimationSubscription$: Subscription;
  isSelectable: boolean;

  private wasSpriteSet = false;
  private isInActionState: boolean;
  private isPlayingActionAnimation = false;

  @ViewChild('characterSpriteImage', { static: true }) spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationDuration: string;
  animationTimeInMiliseconds: number;
  animationState = 'firstFrame';
  spriteHeight: number;
  spriteWidth: number;
  private actionSpriteOffsetX: number;
  private actionSpriteOffsetY: number;
  private wasActionAnimationTimeSet = false;
  defaultXPosition: number;
  defaultYPosition: number;
  actionXPosition: number;
  actionYPosition: number;
  private cardType: GameCardType;

  constructor(
    private store: Store<AppStoreState>,
    private spriteService: SpriteService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chosenCardSubscription$ = this.store
      .select('deck')
      .subscribe((deckStore) => this.handleSelection(deckStore));

    this.playedAnimationSubscription$ = this.store
      .select('game')
      .subscribe(({ playedAnimation }) => {
        this.playedAnimation = playedAnimation;
        this.isInActionState =
          this.character?.id === playedAnimation?.character.id;
        if (this.isInActionState && playedAnimation?.animationPosition) {
          this.actionXPosition = playedAnimation.animationPosition.x;
          this.actionYPosition = playedAnimation.animationPosition.y;
          this.playActionAnimation();
          this.setStylesBasedOnState(true);
        }
      });
  }

  ngAfterViewChecked(): void {
    if (
      (!this.wasSpriteSet || this.character?.position?.x === 0) &&
      this.character
    ) {
      this.wasSpriteSet = true;

      const defaultPosition = (this.spriteImage
        .nativeElement as HTMLElement).getBoundingClientRect();
      this.defaultXPosition = defaultPosition.left;
      this.defaultYPosition = defaultPosition.top;

      if (this.character.position?.x === 0) {
        const character: Character = cloneDeep(this.character);
        const position = {
          x: this.defaultXPosition,
          y: this.defaultYPosition,
          topOffset: character.position.topOffset,
        };
        character.position = position;
        this.store.dispatch(
          this.isEnemy()
            ? EnemyActions.setEnemy({ enemy: character })
            : PlayerActions.setPlayer({ player: character })
        );
      }

      this.playDefaultAnimation();
    }
  }

  ngOnDestroy(): void {
    this.chosenCardSubscription$?.unsubscribe();
    this.playedAnimationSubscription$?.unsubscribe();
  }

  private playDefaultAnimation(): void {
    const [defaultAnimation] = this.character.animations;
    this.setSpriteAnimation(defaultAnimation);
    this.setSprite(defaultAnimation.spriteSheet);
  }

  private playActionAnimation(): void {
    const {
      character: playedAnimationCharacter,
      animationName,
    } = this.playedAnimation;
    const animation = playedAnimationCharacter.animations.find(
      (anima) => anima.spriteSheet === animationName
    );
    this.actionSpriteOffsetX = animation.spriteOffsetX;
    this.actionSpriteOffsetY = animation.spriteOffsetY;
    this.setSprite(animation.spriteSheet);
    this.setSpriteAnimation(animation);
    this.wasActionAnimationTimeSet = true; // To fix issue with timeout started before animationTimeInMiliseconds variable set
  }

  private setSpriteAnimation(animation: CharacterAnimation): void {
    this.animationState = '';
    this.changeDetectorRef.detectChanges();

    const { numberOfFrames, animationTimeInMiliseconds } = animation;
    this.spriteOffset =
      this.spriteService.getAnimationSpriteOffset(animation) + 'px';
    this.animationSteps = `steps(${numberOfFrames})`;
    this.animationTimeInMiliseconds = animationTimeInMiliseconds;
    this.animationDuration =
      animationTimeInMiliseconds + this.ANIMATION_DURATION_UNIT;
    const spriteSize = this.spriteService.getSpriteSize(animation);
    this.spriteHeight = spriteSize.height;
    this.spriteWidth = spriteSize.width;
  }

  private setSprite(spriteSheet: string): void {
    // TODO: CharacterSpriteComponent: nativeElement is undefined?
    this.spriteImage.nativeElement.style.background = this.spriteService.getCharacterSprite(
      spriteSheet,
      this.character.name
    );
    this.animationState = this.FIRST_FRAME_STATE;
    this.changeDetectorRef.detectChanges();
  }

  private handleSelection(deckStore: DeckStoreState): void {
    const characterType = this.character?.stats.type;
    this.cardType = deckStore?.chosenCard?.type || this.cardType; // leave previous if Card not chosen
    const isEnemyAndCardOfAttackType =
      characterType === CharacterType.ENEMY &&
      this.cardType === GameCardType.ATTACK;
    const isPlayerAndCardNotOfAttackType =
      characterType === CharacterType.PLAYER &&
      this.cardType &&
      this.cardType !== GameCardType.ATTACK;
    this.isSelectable =
      isEnemyAndCardOfAttackType || isPlayerAndCardNotOfAttackType;
  }

  onChooseCharacter(): void {
    if (!this.isSelectable) {
      return;
    }

    if (this.character.stats.type === CharacterType.ENEMY) {
      this.store.dispatch(
        EnemyActions.useCardOnEnemy({ enemy: this.character })
      );
    } else {
      this.store.dispatch(PlayerActions.useCardOnPlayer());
    }
  }

  onEndAnimation(event): void {
    this.loopAnimation(event);
    if (
      this.isInActionState &&
      !this.isPlayingActionAnimation &&
      this.wasActionAnimationTimeSet
    ) {
      this.isPlayingActionAnimation = true;
      this.wasActionAnimationTimeSet = false;
      this.resetActionAnimation();
    }
  }

  private loopAnimation(event: AnimationEvent): void {
    this.animationState = this.FIRST_FRAME_STATE;
    if (event.toState === this.FIRST_FRAME_STATE) {
      setTimeout(() => (this.animationState = this.LAST_FRAME_STATE), 0);
    }
  }

  private resetActionAnimation(): void {
    setTimeout(() => {
      this.isPlayingActionAnimation = false;
      this.store.dispatch(
        GameActions.finishCharacterAnimation({
          character: this.character,
        })
      );
      this.setStylesBasedOnState(false);
      this.playDefaultAnimation();
    }, this.animationTimeInMiliseconds - this.SPRITE_TIME_OFFSET);
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;

  private setStylesBasedOnState(isInActionState: boolean): void {
    const spriteElement = this.spriteImage?.nativeElement as HTMLElement;
    if (spriteElement) {
      const isEnemy = this.isEnemy();
      const isEnemyWithNoBuffState =
        isEnemy &&
        this.character.currentAction?.type !== CharacterActionType.BUFF;
      const isCurrentCardAttackType = this.cardType === GameCardType.ATTACK;
      const isInActionPosition =
        isInActionState && (isEnemyWithNoBuffState || isCurrentCardAttackType);
      const position = isInActionPosition
        ? this.ACTION_STYLES.position
        : this.DEFAULT_STYLES.position;
      const yPosition = isInActionPosition
        ? this.actionYPosition
        : this.defaultYPosition;
      const xPosition = isInActionPosition
        ? this.actionXPosition
        : this.defaultXPosition;
      const zIndex = isInActionState
        ? this.ACTION_STYLES.zIndex
        : this.DEFAULT_STYLES.zIndex;
      const offsetX = isInActionPosition
        ? isEnemy
          ? this.actionSpriteOffsetX
          : this.actionSpriteOffsetX * -1
        : 0;
      const offsetY = isInActionPosition ? this.actionSpriteOffsetY : 0;
      const xPositionWithOffsetBasedOnScreenSize =
        xPosition +
        offsetX *
          +CssUtil.getCSSVariable(this.SPRITE_SIZE_MULTIPLIER_VARIABLE) +
        'px';
      const yPositionWithOffsetBasedOnScreenSize =
        yPosition +
        offsetY *
          +CssUtil.getCSSVariable(this.SPRITE_SIZE_MULTIPLIER_VARIABLE) +
        'px';
      spriteElement.style.left = xPositionWithOffsetBasedOnScreenSize;
      spriteElement.style.top = yPositionWithOffsetBasedOnScreenSize;
      spriteElement.style.position = position;
      spriteElement.style.zIndex = zIndex;
    }
  }
}
