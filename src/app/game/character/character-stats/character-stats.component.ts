import { Component, Input, OnInit } from '@angular/core';

import Character from '../models/character.model';
import SpriteService from '../services/sprite.service';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.css'],
})
export class CharacterStatsComponent implements OnInit {
  @Input() character: Character;
  shieldImage: string;

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    if (this.character) {
      this.shieldImage = this.spriteService.getShieldSprite();
    }
  }
}
