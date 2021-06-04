import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import CharacterType from '../enums/character-type.enum';
import Character from '../models/character.model';

@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.css'],
})
export class CharacterLayoutComponent implements OnInit, AfterViewInit {
  @Input() character: Character;
  randomTopOffset: number;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.randomTopOffset = this.character.position?.y;
    this.changeDetectorRef.detectChanges();
  }

  isEnemy = (): boolean => this.character?.stats.type === CharacterType.ENEMY;
}
