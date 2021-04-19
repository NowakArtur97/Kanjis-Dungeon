import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.css'],
})
export class CharacterStatsComponent implements OnInit {
  health: number;
  maxHealth: number;

  constructor() {}

  ngOnInit(): void {
    // TODO: CharacterStats: Get health from Store
    this.health = 90;
    this.maxHealth = 100;

    // TODO: CharacterStats: Change on damage
    setInterval(() => {
      this.health = 45;
      setInterval(() => {
        this.health = 20;
      }, 1000);
    }, 1000);
  }
}
