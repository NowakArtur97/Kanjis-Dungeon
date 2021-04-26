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
  @ViewChild('characterSpriteImage') spriteImage: ElementRef;
  spriteOffset: string;
  animationSteps: string;
  animationState = 'firstFrame';

  private wasAnimationSet = false;

  constructor(protected animationService: AnimationService) {}

  ngOnInit(): void {
    this.spriteOffset =
      this.animationService.getAnimationSpriteOffset(
        this.character.animations[0]
      ) + 'px';
    this.animationSteps = `steps(${this.character.animations[0].numberOfFrames})`;
  }

  ngAfterViewChecked(): void {
    // TODO: Try to replace with @HostBinding('style.--target-width')
    // private targetWidth: string = '60%';
    if (!this.wasAnimationSet) {
      this.wasAnimationSet = true;
      this.animationService.changeAnimation(
        this.spriteImage,
        this.character.animations[0]
      );
    }
  }

  onEndAnimation(event): void {
    this.animationState = 'firstFrame';
    if (event.toState === 'firstFrame') {
      setTimeout(() => {
        this.animationState = 'lastFrame';
      }, 0);
    }
  }
}
