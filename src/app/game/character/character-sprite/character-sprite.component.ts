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
import AppStoreState from 'src/app/store/app.state';

import GameCardType from '../../deck/enums/game-card-type.enum';
import { DeckStoreState } from '../../deck/store/deck.reducer';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import * as PlayerActions from '../../player/store/player.actions';
import * as GameActions from '../../store/game.actions';
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
  @Input() character: Character;
  private playedAnimation: CharacterPlayedAnimation;
  private chosenCardSubscription$: Subscription;
  private playedAnimationSubscription$: Subscription;
  isSelectable: boolean;

  private wasSpriteSet = false;
  isInActionState: boolean;

  @ViewChild('characterSpriteImage') private spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationDuration: string;
  animationTimeInMiliseconds: number;
  animationState = 'firstFrame';
  spriteHeight: number;
  spriteWidth: number;
  defaultXPosition: number;
  defaultYPosition: number;
  actionXPosition: number;
  actionYPosition: number;
  private isPlayingActionAnimation = false;

  private readonly FIRST_FRAME_STATE = 'firstFrame';
  private readonly LAST_FRAME_STATE = 'lastFrame';
  private readonly ANIMATION_DURATION_UNIT = 'ms';
  private readonly SPRITE_TIME_OFFSET = 100;
  private readonly ACTION_STYLES = { position: 'fixed', zIndex: '2' };
  private readonly DEFAULT_STYLES = { position: 'static', zIndex: '1' };

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
      .subscribe(({ playedAnimation, animationPosition }) => {
        this.playedAnimation = playedAnimation;
        this.isInActionState =
          this.character?.id === playedAnimation?.character.id;
        if (
          this.isInActionState &&
          (animationPosition || playedAnimation.animationPosition)
        ) {
          this.actionXPosition =
            animationPosition?.x || playedAnimation.animationPosition.x;
          this.actionYPosition =
            animationPosition?.y || playedAnimation.animationPosition.y;

          this.setStylesBasedOnState(true);
          this.playActionAnimation();
        }
      });
  }

  ngAfterViewChecked(): void {
    if (!this.wasSpriteSet && this.character) {
      this.wasSpriteSet = true;

      const defaultPosition = (this.spriteImage
        .nativeElement as HTMLElement).getBoundingClientRect();
      this.defaultXPosition = defaultPosition.left;
      this.defaultYPosition = defaultPosition.top;

      // TODO: TEST
      // TODO: CharacterSpriteComponent: Set every character position for Action Animations on start of the level
      if (!this.isEnemy()) {
        const player: Character = cloneDeep(this.character);
        player.position = {
          x: this.defaultXPosition,
          y: this.defaultYPosition,
        };
        this.store.dispatch(PlayerActions.setPlayer({ player }));
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
    this.setSpriteAnimation(animation);
    this.setSprite(animation.spriteSheet);
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
    this.spriteImage.nativeElement.style.background = this.spriteService.getCharacterSprite(
      spriteSheet,
      this.character.name
    );

    this.animationState = this.FIRST_FRAME_STATE;
    this.changeDetectorRef.detectChanges();
  }

  private handleSelection(deckStore: DeckStoreState): void {
    const characterType = this.character?.stats.type;
    const cardType = deckStore?.chosenCard?.type;
    const isEnemyAndCardOfAttackType =
      characterType === CharacterType.ENEMY && cardType === GameCardType.ATTACK;
    const isPlayerAndCardNotOfAttackType =
      characterType === CharacterType.PLAYER &&
      cardType &&
      cardType !== GameCardType.ATTACK;
    this.isSelectable =
      isEnemyAndCardOfAttackType || isPlayerAndCardNotOfAttackType;
  }

  onChooseCharacter(): void {
    if (!this.isSelectable) {
      return;
    }

    if (this.character.stats.type === CharacterType.ENEMY) {
      const {
        left: x,
        top: y,
      } = this.spriteImage.nativeElement.getBoundingClientRect();

      this.store.dispatch(
        GameActions.setAnimationPosition({
          animationPosition: { x, y },
        })
      );
      this.store.dispatch(
        EnemyActions.useCardOnEnemy({ enemy: this.character })
      );
    } else {
      this.store.dispatch(PlayerActions.useCardOnPlayer());
    }
  }

  onEndAnimation(event): void {
    this.loopAnimation(event);
    if (this.isInActionState && !this.isPlayingActionAnimation) {
      this.isPlayingActionAnimation = true;
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
    // TODO: TEST
    setTimeout(() => {
      this.isPlayingActionAnimation = false;
      this.setStylesBasedOnState(false);
      this.playDefaultAnimation();
      console.log(this.character.name);
      this.store.dispatch(
        GameActions.finishCharacterAnimation({
          character: this.character,
        })
      );
    }, this.animationTimeInMiliseconds - this.SPRITE_TIME_OFFSET);
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;

  private setStylesBasedOnState(isInActionState: boolean): void {
    const spriteElement = this.spriteImage?.nativeElement as HTMLElement;
    if (spriteElement) {
      const position = isInActionState
        ? this.ACTION_STYLES.position
        : this.DEFAULT_STYLES.position;
      const top = isInActionState
        ? this.actionYPosition
        : this.defaultYPosition;
      const left = isInActionState
        ? this.actionXPosition
        : this.defaultXPosition;
      const zIndex = isInActionState
        ? this.ACTION_STYLES.zIndex
        : this.DEFAULT_STYLES.zIndex;

      spriteElement.style.left =
        (this.isEnemy() ? left + this.spriteWidth : left - this.spriteWidth) +
        'px';
      spriteElement.style.top = top + 'px';
      spriteElement.style.position = position;
      spriteElement.style.zIndex = zIndex;
    }
  }
}
