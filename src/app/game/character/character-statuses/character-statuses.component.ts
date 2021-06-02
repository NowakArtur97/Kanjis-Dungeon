import { Component, Input, OnInit } from '@angular/core';

import CharacterStatus from '../models/character-status.model';
import Character from '../models/character.model';
import SpriteService from '../services/sprite.service';

@Component({
  selector: 'app-character-statuses',
  templateUrl: './character-statuses.component.html',
  styleUrls: ['./character-statuses.component.css'],
})
export class CharacterStatusesComponent implements OnInit {
  private wasSpriteSet = false;

  @Input() character: Character;
  statuses: CharacterStatus[];

  constructor(protected spriteService: SpriteService) {}

  ngOnInit(): void {
    if (!this.wasSpriteSet && this.character) {
      this.wasSpriteSet = true;
      this.statuses = [...this.character.statuses].map((status) => {
        const newStatus = { ...status };
        newStatus.spriteSheet = this.spriteService.getStatusSprite(
          status.spriteSheet
        );
        return newStatus;
      });
    }
  }
}
