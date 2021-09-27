import { Component, OnInit } from '@angular/core';

import HIRAGANA from '../../hiragana.data';
import KATAKANA from '../../katakana.data';
import Letter from '../../models/letter.model';

@Component({
  selector: 'app-japanese-alphabet',
  templateUrl: './japanese-alphabet.component.html',
  styleUrls: ['./japanese-alphabet.component.css'],
})
export class JapaneseAlphabetComponent implements OnInit {
  alphabet: Letter[];
  isHiraganaActive = true;

  constructor() {}

  ngOnInit(): void {
    this.alphabet = HIRAGANA;
  }

  onChangeAlphabet(): void {
    this.isHiraganaActive = !this.isHiraganaActive;
    this.alphabet = this.isHiraganaActive ? HIRAGANA : KATAKANA;
  }
}
