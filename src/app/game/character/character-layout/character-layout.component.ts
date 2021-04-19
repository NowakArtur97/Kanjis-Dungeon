import { Component, Input, OnInit } from '@angular/core';

import Character from '../models/character.model';

@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.css'],
})
export class CharacterLayoutComponent implements OnInit {
  @Input() characterStats: Character;

  constructor() {}

  ngOnInit(): void {}
}
