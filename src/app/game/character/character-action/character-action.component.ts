import { Component, Input, OnInit } from '@angular/core';

import CharacterAction from '../models/character-action.model';
import Character from '../models/character.model';
import SpriteService from '../services/sprite.service';

@Component({
  selector: 'app-character-action',
  templateUrl: './character-action.component.html',
  styleUrls: ['./character-action.component.css'],
})
export class CharacterActionComponent implements OnInit {
  @Input() character: Character;
  characterAction: CharacterAction;
  actionImage: string;
  topOffset: number;

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    if (this.character) {
      this.characterAction = this.character.currentAction;
      this.actionImage = this.spriteService.getActionSprite(
        this.characterAction.action
      );
      this.topOffset =
        -this.spriteService.getSpriteSize(this.character.animations[0]).height /
        8;
    }
  }
}
