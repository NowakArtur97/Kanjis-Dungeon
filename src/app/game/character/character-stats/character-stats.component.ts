import { Component, Input, OnInit } from '@angular/core';

import SpriteService from '../../services/sprite.service';
import CharacterStats from '../models/character-stats.mode';
import Character from '../models/character.model';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.css'],
})
export class CharacterStatsComponent implements OnInit {
  @Input() character: Character;

  characterStats: CharacterStats;
  shieldImage: string;

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    if (this.character) {
      this.characterStats = this.character.stats;
      this.shieldImage = this.spriteService.getShieldSprite();
    }
  }
}
