import { Component, Input, OnInit } from '@angular/core';

import SpriteService from '../../services/sprite.service';
import CharacterStatus from '../models/character-status.model';
import Character from '../models/character.model';

@Component({
  selector: 'app-character-statuses',
  templateUrl: './character-statuses.component.html',
  styleUrls: ['./character-statuses.component.css'],
})
export class CharacterStatusesComponent implements OnInit {
  private wasSpriteSet = false;

  @Input() private character: Character;
  statuses: CharacterStatus[];

  constructor(protected spriteService: SpriteService) {}

  ngOnInit(): void {
    if (!this.wasSpriteSet && this.character) {
      this.wasSpriteSet = true;
      this.statuses = this.character.statuses.map((status) => {
        status.spriteSheet = this.spriteService.getStatusSprite(
          status.spriteSheet
        );
        return status;
      });
    }
  }
}
