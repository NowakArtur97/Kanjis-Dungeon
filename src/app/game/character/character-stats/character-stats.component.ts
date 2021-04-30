import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    if (this.character) {
      this.characterStats = this.character.stats;
      // TODO: CharacterStats: Change on damage
      setInterval(() => {
        this.characterStats.currentHealth =
          this.character.stats.currentHealth -
          0.2 * this.character.stats.currentHealth;
        setInterval(() => {
          this.characterStats.currentHealth =
            this.character.stats.currentHealth -
            0.2 * this.character.stats.currentHealth;
        }, 1000);
      }, 1000);
    }
  }
}
