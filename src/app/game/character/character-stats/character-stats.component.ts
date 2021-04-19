import { Component, Input, OnInit } from '@angular/core';

import Character from '../models/character.model';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.css'],
})
export class CharacterStatsComponent implements OnInit {
  @Input() characterStats: Character;

  health: number;
  maxHealth: number;

  constructor() {}

  ngOnInit(): void {
    this.health = this.characterStats.currentHealth;
    this.maxHealth == this.characterStats.maxHealth;
    // TODO: CharacterStats: Change on damage
    setInterval(() => {
      this.health =
        this.characterStats.currentHealth -
        0.2 * this.characterStats.currentHealth;
      setInterval(() => {
        this.characterStats.currentHealth -
          0.2 * this.characterStats.currentHealth;
      }, 1000);
    }, 1000);
  }
}
