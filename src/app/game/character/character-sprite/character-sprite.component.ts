import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import AnimationOptions from '../../models/animation-options.model';
import AnimationService from '../../services/animation.service';
import Character from '../models/character.model';

@Component({
  selector: 'app-character-sprite',
  templateUrl: './character-sprite.component.html',
  styleUrls: ['./character-sprite.component.css'],
})
export class CharacterSpriteComponent implements OnInit, AfterViewInit {
  @Input() characterStats: Character;
  @ViewChild('characterSpriteImage') spriteImage: ElementRef;

  constructor(protected animationService: AnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // TODO: CharacterSpriteComponent: Move to Character Animations property
    const exampleAnimationOptions: AnimationOptions = {
      image: this.characterStats.imageName,
      numberOfFrames: 4,
      animationTimeInMiliseconds: 600,
      animationIterationCount: 'Infinite',
    };
    this.animationService.changeAnimation(
      this.spriteImage,
      exampleAnimationOptions
    );
  }
}
