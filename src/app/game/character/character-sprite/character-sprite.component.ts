import { AfterViewInit, Component, OnInit } from '@angular/core';

import AnimationOptions from '../../models/animation-options.model';
import AnimationService from '../../services/animation.service';

@Component({
  selector: 'app-character-sprite',
  templateUrl: './character-sprite.component.html',
  styleUrls: ['./character-sprite.component.css'],
})
export class CharacterSpriteComponent implements OnInit, AfterViewInit {
  constructor(protected animationService: AnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const exampleAnimationOptions: AnimationOptions = {
      image: 'example-character',
      numberOfFrames: 4,
      animationTimeInMiliseconds: 600,
      animationIterationCount: 'Infinite',
    };
    this.animationService.changeAnimation(exampleAnimationOptions);
  }
}
