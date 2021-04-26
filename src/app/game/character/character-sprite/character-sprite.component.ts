import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import AnimationService from '../../services/animation.service';
import Character from '../models/character.model';

@Component({
  selector: 'app-character-sprite',
  templateUrl: './character-sprite.component.html',
  styleUrls: ['./character-sprite.component.css'],
})
export class CharacterSpriteComponent implements OnInit, AfterViewInit {
  @Input() character: Character;
  @ViewChild('characterSpriteImage') spriteImage: ElementRef;

  constructor(protected animationService: AnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // TODO: CharacterSpriteComponent: Move to Character Animations property
    this.animationService.changeAnimation(
      this.spriteImage,
      this.character.animations[0]
    );
  }
}
