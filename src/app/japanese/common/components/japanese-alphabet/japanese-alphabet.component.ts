import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import HIRAGANA from '../../hiragana.data';
import KATAKANA from '../../katakana.data';
import Letter from '../../models/letter.model';

@Component({
  selector: 'app-japanese-alphabet',
  templateUrl: './japanese-alphabet.component.html',
  styleUrls: ['./japanese-alphabet.component.css'],
  animations: [
    trigger('appear', [
      state('in', style({ transform: 'scale(1)' })),
      transition(
        'void => *',
        animate(
          200,
          keyframes([
            style({ transform: 'scale(0)', offset: 0 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        )
      ),
    ]),
    trigger('show', [
      state(
        'hidden',
        style({
          transform: 'translateY(100%)',
        })
      ),
      state('revealed', style({ transform: 'translateY(0)' })),
      transition('hidden <=> revealed', animate('200ms')),
    ]),
  ],
})
export class JapaneseAlphabetComponent implements OnInit {
  alphabet: Letter[] = [];
  private currentAlphabet = HIRAGANA;
  isHiraganaActive = true;
  private timer: any;

  private readonly HIDDEN_STATE = 'hidden';
  readonly REVEALED_STATE = 'revealed';
  toggleState = this.HIDDEN_STATE;
  private readonly SHOW_MESSAGE = 'Show alphabet';
  private readonly HIDE_MESSAGE = 'Hide alphabet';
  message = this.SHOW_MESSAGE;

  constructor() {}

  ngOnInit(): void {}

  private loadAlphabet(): void {
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

  onToggleAlphabet(): void {
    const isHidden = this.toggleState === this.HIDDEN_STATE;
    this.toggleState = isHidden ? this.REVEALED_STATE : this.HIDDEN_STATE;
    this.message = isHidden ? this.HIDE_MESSAGE : this.SHOW_MESSAGE;
    if (isHidden) {
      this.alphabet = [];
    }
    setTimeout(() => this.loadAlphabet(), 200);
  }
}
