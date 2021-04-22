import { Component, OnInit } from '@angular/core';

import Character from '../../character/models/character.model';

@Component({
  selector: 'app-enemies-layout',
  templateUrl: './enemies-layout.component.html',
  styleUrls: ['./enemies-layout.component.css'],
})
export class EnemiesLayoutComponent implements OnInit {
  // TODO: EnemiesLayout: Get enemies from Store
  enemies: Character[] = [
    {
      currentHealth: 70,
      maxHealth: 70,
      damage: 10,
      maxDamage: 12,
      isEnemy: true,
    },
    {
      currentHealth: 45,
      maxHealth: 50,
      damage: 7,
      maxDamage: 10,
      isEnemy: true,
    },
    {
      currentHealth: 30,
      maxHealth: 40,
      damage: 7,
      maxDamage: 15,
      isEnemy: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
