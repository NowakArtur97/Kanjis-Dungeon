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

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    const currentAction = this.character?.currentAction;
    if (currentAction) {
      this.characterAction = currentAction;
      this.actionImage = this.spriteService.getActionSprite(
        this.characterAction.action
      );
    }
  }
}
