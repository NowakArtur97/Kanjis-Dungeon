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
  alphabet: Letter[] = [];
  private currentAlphabet = HIRAGANA;
  isHiraganaActive = true;
  timer: any;

  constructor() {}

  ngOnInit(): void {
    this.loadAlphabet();
  }

  private loadAlphabet(): void {
    this.alphabet = [];
    let index = 0;
    const elementsDelay = 20;
    this.timer = setInterval(() => {
      if (index < this.currentAlphabet.length) {
        this.alphabet.push(this.currentAlphabet[index]);
        index++;
      } else {
        clearInterval(this.timer);
      }
    }, elementsDelay);
  }

  onChangeAlphabet(): void {
    this.isHiraganaActive = !this.isHiraganaActive;
    this.currentAlphabet = this.isHiraganaActive ? HIRAGANA : KATAKANA;
    this.loadAlphabet();
  }
}
