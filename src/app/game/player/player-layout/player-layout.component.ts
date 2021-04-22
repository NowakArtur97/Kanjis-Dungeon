import { Component, OnInit } from '@angular/core';

import Character from '../../character/models/character.model';

@Component({
  selector: 'app-player-layout',
  templateUrl: './player-layout.component.html',
  styleUrls: ['./player-layout.component.css'],
})
export class PlayerLayoutComponent implements OnInit {
  player: Character = {
    imageName: 'example-character',
    currentHealth: 100,
    maxHealth: 100,
    damage: 20,
    maxDamage: 22,
    isEnemy: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
