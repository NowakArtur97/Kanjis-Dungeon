import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GameCardType from '../../deck/enums/game-card-type.enum';
import { DeckStoreState } from '../../deck/store/deck.reducer';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import * as PlayerActions from '../../player/store/player.actions';
import CharacterType from '../enums/character-type.enum';
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
  private chosenCardSubscription$: Subscription;
  isSelectable: boolean;

  @ViewChild('characterSpriteImage') private spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationDuration: string;
  animationState = 'firstFrame';
  spriteHeight: number;
  spriteWidth: number;

  private wasAnimationSet = false;
  private readonly FIRST_FRAME_STATE = 'firstFrame';
  private readonly LAST_FRAME_STATE = 'lastFrame';
  private readonly ANIMATION_DURATIONUNIT = 'ms';

  constructor(
    private store: Store<AppStoreState>,
    private spriteService: SpriteService
  ) {}

  // TODO: TEST
  ngOnInit(): void {
    if (this.character) {
      const firstAnimation = this.character.animations[0];
      this.spriteOffset =
        this.spriteService.getAnimationSpriteOffset(firstAnimation) + 'px';
      this.animationSteps = `steps(${firstAnimation.numberOfFrames})`;
      this.animationDuration =
        firstAnimation.animationTimeInMiliseconds + this.ANIMATION_DURATIONUNIT;
      const spriteSize = this.spriteService.getSpriteSize(firstAnimation);
      this.spriteHeight = spriteSize.height;
      this.spriteWidth = spriteSize.width;
    }

    this.chosenCardSubscription$ = this.store
      .select('deck')
      .subscribe((deckStore) => {
        this.handleSelection(deckStore);
      });
  }

  ngAfterViewChecked(): void {
    if (!this.wasAnimationSet && this.character) {
      this.wasAnimationSet = true;
      this.spriteImage.nativeElement.style.background = this.spriteService.getCharacterSprite(
        this.character.animations[0].spriteSheet,
        this.character.name
      );
    }
  }

  ngOnDestroy(): void {
    this.chosenCardSubscription$?.unsubscribe();
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

  onEndAnimation(event): void {
    // Loop animation
    this.animationState = this.FIRST_FRAME_STATE;
    if (event.toState === this.FIRST_FRAME_STATE) {
      setTimeout(() => {
        this.animationState = this.LAST_FRAME_STATE;
      }, 0);
    }
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;
}
