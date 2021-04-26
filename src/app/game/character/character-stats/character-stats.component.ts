import { Component, Input, OnInit } from '@angular/core';

import Character from '../models/character.model';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.css'],
})
export class CharacterStatsComponent implements OnInit {
  @Input() character: Character;

  health: number;
  maxHealth: number;

  constructor() {}

  ngOnInit(): void {
    this.health = this.character.stats.currentHealth;
    this.maxHealth == this.character.stats.maxHealth;
    // TODO: CharacterStats: Change on damage
    setInterval(() => {
      this.health =
        this.character.stats.currentHealth -
        0.2 * this.character.stats.currentHealth;
      setInterval(() => {
        this.character.stats.currentHealth -
          0.2 * this.character.stats.currentHealth;
      }, 1000);
    }, 1000);
  }
}
