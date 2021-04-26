import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import AnimationService from '../../services/animation.service';
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
export class CharacterSpriteComponent implements OnInit, AfterViewChecked {
  @Input() character: Character;
  @ViewChild('characterSpriteImage') private spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationState = 'firstFrame';

  private wasAnimationSet = false;

  constructor(protected animationService: AnimationService) {}

  ngOnInit(): void {
    // TODO: CharacterSpriteComponent: Get animation from store
    if (this.character) {
      this.spriteOffset =
        this.animationService.getAnimationSpriteOffset(
          this.character.animations[0]
        ) + 'px';
      this.animationSteps = `steps(${this.character.animations[0].numberOfFrames})`;
    }
  }

  ngAfterViewChecked(): void {
    if (!this.wasAnimationSet && this.character) {
      this.wasAnimationSet = true;
      this.spriteImage.nativeElement.style.background = this.animationService.getSprite(
        this.character.name,
        this.character.animations[0]
      );
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
}
