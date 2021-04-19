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
    this.health = 90;
    this.maxHealth = 100;
  }
}
