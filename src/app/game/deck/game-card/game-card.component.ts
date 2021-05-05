import { Component, Input, OnInit } from '@angular/core';

import GameCard from '../models/game-card.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() card: GameCard;

  constructor() {}

  ngOnInit(): void {}
}
