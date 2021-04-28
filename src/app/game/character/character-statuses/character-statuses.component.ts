import { Component, OnInit } from '@angular/core';

import CharacterStatus from '../models/character-status.model';

@Component({
  selector: 'app-character-statuses',
  templateUrl: './character-statuses.component.html',
  styleUrls: ['./character-statuses.component.css'],
})
export class CharacterStatusesComponent implements OnInit {
  private STATUSES_PATH = '../../../../assets/statuses';
  private STATUS_IMAGE_EXTENSION = '.png';

  statuses: CharacterStatus[];
  constructor() {}

  ngOnInit(): void {
    // TODO: CharacterStatusesComponent: Get by Input
    this.statuses = [
      {
        spriteSheet: `${this.STATUSES_PATH}/heart_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/book_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/heart_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/book_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/heart_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/book_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 3,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/heart_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 2,
      },
      {
        spriteSheet: `${this.STATUSES_PATH}/book_2x${this.STATUS_IMAGE_EXTENSION}`,
        remainingNumberOfActiveRounds: 3,
      },
    ];
  }
}
