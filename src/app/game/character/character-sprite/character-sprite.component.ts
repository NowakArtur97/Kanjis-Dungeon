import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('characterSpriteImage') private spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationDuration: string;
  animationState = 'firstFrame';
  spriteHeight: number;
  spriteWidth: number;

  private readonly FIRST_FRAME_STATE = 'firstFrame';
  private readonly LAST_FRAME_STATE = 'lastFrame';
  private readonly ANIMATION_DURATIONUNIT = 'ms';

  constructor(
    private store: Store<AppStoreState>,
    private spriteService: SpriteService
  ) {}

  // TODO: TEST
  ngOnInit(): void {
    this.chosenCardSubscription$ = this.store
      .select('deck')
      .subscribe((deckStore) => {
        this.handleSelection(deckStore);
      });

    this.playedAnimationSubscription$ = this.store
      .select('game')
      .subscribe(({ playedAnimation }) => {
        this.playedAnimation = playedAnimation;
        if (this.character.id === playedAnimation?.character.id) {
          this.playActionAnimation();
        } else {
          this.playDefaultAnimation();
        }
      });
  }

  ngAfterViewChecked(): void {
    if (this.character?.id !== this.playedAnimation?.character.id) {
      const defaultSpriteSheet = this.character.animations[0].spriteSheet;
      this.setSprite(defaultSpriteSheet);
    }
  }

  ngOnDestroy(): void {
    this.chosenCardSubscription$?.unsubscribe();
    this.playedAnimationSubscription$?.unsubscribe();
  }

  private playDefaultAnimation() {
    const [defaultAnimation] = this.character.animations;
    this.setSpriteAnimation(defaultAnimation);
  }

  private playActionAnimation() {
    // TODO: CharacterSpriteComponent: Set position
    const {
      character: playedAnimationCharacter,
      animationName,
    } = this.playedAnimation;
    const animation = playedAnimationCharacter.animations.find(
      (anima) => anima.spriteSheet === animationName
    );
    this.setSprite(animation.spriteSheet);
    this.setSpriteAnimation(animation);
  }

  private setSpriteAnimation(animation: CharacterAnimation) {
    this.spriteOffset =
      this.spriteService.getAnimationSpriteOffset(animation) + 'px';
    this.animationSteps = `steps(${animation.numberOfFrames})`;
    this.animationDuration =
      animation.animationTimeInMiliseconds + this.ANIMATION_DURATIONUNIT;
    const spriteSize = this.spriteService.getSpriteSize(animation);
    this.spriteHeight = spriteSize.height;
    this.spriteWidth = spriteSize.width;
  }

  private setSprite(spriteSheet: string): void {
    this.spriteImage.nativeElement.style.background = this.spriteService.getCharacterSprite(
      spriteSheet,
      this.character.name
    );
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
      setTimeout(() => {
        this.animationState = this.LAST_FRAME_STATE;
        if (this.character.id === this.playedAnimation?.character.id) {
          this.store.dispatch(GameActions.finishCharacterAnimation());
        }
      }, 0);
    }
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;
}
