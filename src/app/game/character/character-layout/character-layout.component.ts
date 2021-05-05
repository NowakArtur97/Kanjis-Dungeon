import { Component, Input, OnInit } from '@angular/core';
import MathUtil from 'src/app/common/utils/math.util';

import CharacterType from '../enums/character-type.enum';
import Character from '../models/character.model';

@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.css'],
})
export class CharacterLayoutComponent implements OnInit {
  @Input() character: Character;
  randomTopOffset: number;

  constructor() {}

  ngOnInit(): void {
    // Move to some constants/properties file (?)
    const minTopOffset = 40;
    const maxTopOffset = 55;
    this.randomTopOffset = MathUtil.getRandomIntValue(
      maxTopOffset,
      minTopOffset
    );
  }

  isEnemy = (): boolean => this.character.stats.type === CharacterType.ENEMY;
}
