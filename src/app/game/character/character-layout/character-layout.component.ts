import { Component, Input, OnInit } from '@angular/core';
import MathUtil from 'src/app/common/utils/math.util';

import Character from '../models/character.model';

@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.css'],
})
export class CharacterLayoutComponent implements OnInit {
  @Input() characterStats: Character;

  randomTopOffset: number;

  constructor() {}

  ngOnInit(): void {
    // Move to some constants/properties file (?)
    const minTopOffset = 30;
    const maxTopOffset = 50;
    this.randomTopOffset = MathUtil.getRandomIntValue(
      maxTopOffset,
      minTopOffset
    );
  }
}
