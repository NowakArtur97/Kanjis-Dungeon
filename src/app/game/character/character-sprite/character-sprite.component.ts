import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import GameCardType from '../../deck/enums/game-card-type.enum';
import { DeckStoreState } from '../../deck/store/deck.reducer';
import * as EnemyActions from '../../enemy/store/enemy.actions';
import * as PlayerActions from '../../player/store/player.actions';
import SpriteService from '../../services/sprite.service';
import CharacterType from '../enums/character-type.enum';
import Character from '../models/character.model';

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
        animate('600ms {{animationSteps}}'),
        {
          params: { animationSteps: '', spriteOffset: '' },
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
  animationState = 'firstFrame';

  private wasAnimationSet = false;

  constructor(
    private store: Store<AppStoreState>,
    protected spriteService: SpriteService
  ) {}

  ngOnInit(): void {
    if (this.character) {
      this.spriteOffset =
        this.spriteService.getAnimationSpriteOffset(
          this.character.animations[0]
        ) + 'px';
      this.animationSteps = `steps(${this.character.animations[0].numberOfFrames})`;
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
    if (this.character.stats.type === CharacterType.ENEMY) {
      this.store.dispatch(
        EnemyActions.useCardOnEnemy({ enemy: this.character })
      );
    } else {
      this.store.dispatch(PlayerActions.useCardOnPlayer());
    }
  }

  onEndAnimation(event): void {
    // Loop animation
    this.animationState = 'firstFrame';
    if (event.toState === 'firstFrame') {
      setTimeout(() => {
        this.animationState = 'lastFrame';
      }, 0);
    }
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;
}
