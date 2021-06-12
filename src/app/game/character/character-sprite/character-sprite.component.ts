import { animate, state, style, transition, trigger } from '@angular/animations';
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

  @ViewChild('characterSpriteImage') private spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationDuration: string;
  animationTimeInMiliseconds: number;
  animationState = 'firstFrame';
  spriteHeight: number;
  spriteWidth: number;

  private readonly FIRST_FRAME_STATE = 'firstFrame';
  private readonly LAST_FRAME_STATE = 'lastFrame';
  private readonly ANIMATION_DURATION_UNIT = 'ms';
  private readonly SPRITE_TIME_OFFSET = 100;

  constructor(
    private store: Store<AppStoreState>,
    private spriteService: SpriteService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  // TODO: TEST
  ngOnInit(): void {
    this.chosenCardSubscription$ = this.store
      .select('deck')
      .subscribe((deckStore) => this.handleSelection(deckStore));

    this.playedAnimationSubscription$ = this.store
      .select('game')
      .subscribe(({ playedAnimation }) => {
        this.playedAnimation = playedAnimation;
        if (this.character?.id === playedAnimation?.character.id) {
          this.playActionAnimation();
        }
      });
  }

  ngAfterViewChecked(): void {
    if (!this.wasSpriteSet && this.character) {
      this.wasSpriteSet = true;
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
    // TODO: CharacterSpriteComponent: Set position
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
    this.store.dispatch(
      this.character.stats.type === CharacterType.ENEMY
        ? EnemyActions.useCardOnEnemy({ enemy: this.character })
        : PlayerActions.useCardOnPlayer()
    );
  }

  // TODO: TEST
  onEndAnimation(event): void {
    // Loop animation
    this.animationState = this.FIRST_FRAME_STATE;
    if (event.toState === this.FIRST_FRAME_STATE) {
      setTimeout(() => (this.animationState = this.LAST_FRAME_STATE), 0);
    }
    if (this.character.id === this.playedAnimation?.character.id) {
      this.store.dispatch(GameActions.finishCharacterAnimation());
      setTimeout(
        () => this.playDefaultAnimation(),
        this.animationTimeInMiliseconds - this.SPRITE_TIME_OFFSET
      );
    }
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;
}
