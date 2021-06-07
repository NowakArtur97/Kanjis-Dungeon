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
  currentHealth: number;
  maxHealth: number;
  progress: number;
  backgroundColor = 'green';

  constructor(private spriteService: SpriteService) {}

  ngOnInit(): void {
    if (this.character) {
      this.shieldImage = this.spriteService.getShieldSprite();
      const { stats } = this.character;
      this.maxHealth = stats.maxHealth;
      this.currentHealth = stats.currentHealth;
      this.progress = (this.currentHealth / this.maxHealth) * 100;
      this.setBackgroundColor();
    }
  }

  private setBackgroundColor(): void {
    // TODO: CharacterStatsComponent: Move to some properties file / retrieve by Input?
    if (this.progress <= 25) {
      this.backgroundColor = 'hsl(0deg 100% 40%)';
    } else if (this.progress <= 50) {
      this.backgroundColor = 'hsl(60deg 100% 35%)';
    } else {
      this.backgroundColor = 'hsl(120deg 70% 40%)';
    }
  }

  getHealthBarStyles(): { width: string; 'background-color': string } {
    return {
      width: `${this.progress}%`,
      'background-color': this.backgroundColor,
    };
  }
}
