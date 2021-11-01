import { Component, OnInit } from '@angular/core';
import appearTrigger from 'src/app/common/animations/appear.animation';
import slideInTrigger from 'src/app/common/animations/slide-in.animation';

import HIRAGANA from '../../hiragana.data';
import KATAKANA from '../../katakana.data';
import Letter from '../../models/letter.model';

@Component({
  selector: 'app-japanese-alphabet',
  templateUrl: './japanese-alphabet.component.html',
  styleUrls: ['./japanese-alphabet.component.css'],
  animations: [
    appearTrigger('in', 200),
    slideInTrigger(
      'show',
      'hidden',
      'translateY(100vh)',
      'revealed',
      'translateY(0)'
    ),
  ],
})
export class JapaneseAlphabetComponent implements OnInit {
  private readonly LOAD_OFFSET = 200;
  private readonly ELEMENTS_DELAY = 20;

  alphabet: Letter[] = [];
  private currentAlphabet = HIRAGANA;
  isHiraganaActive = true;
  private pushElementTimer: any;
  private loadTimer: any;

  private readonly HIDDEN_STATE = 'hidden';
  private readonly REVEALED_STATE = 'revealed';
  toggleState = this.HIDDEN_STATE;
  private readonly SHOW_MESSAGE = 'Show alphabet';
  private readonly HIDE_MESSAGE = 'Hide alphabet';
  message = this.SHOW_MESSAGE;
  isHidden = true;
  // TODO: REFACTOR with QuizQuestionsSelectionComponent (move to directive)
  display = 'none';
  private displayMode = { hidden: 'none', show: 'block' };

  constructor() {}

  ngOnInit(): void {}

  // TODO: REFACTOR with QuizQuestionsSelectionComponent
  private loadAlphabet(): void {
    let index = 0;
    this.alphabet = [];
    clearInterval(this.pushElementTimer);

    this.pushElementTimer = setInterval(() => {
      if (index < this.currentAlphabet.length) {
        this.alphabet.push(this.currentAlphabet[index]);
        index++;
      } else {
        clearInterval(this.pushElementTimer);
      }
    }, this.ELEMENTS_DELAY);
  }

  onChangeAlphabet(): void {
    this.isHiraganaActive = !this.isHiraganaActive;
    this.currentAlphabet = this.isHiraganaActive ? HIRAGANA : KATAKANA;
    this.loadAlphabet();
  }

  onToggleAlphabet(): void {
    this.isHidden = !this.isHidden;

    if (this.isHidden) {
      this.toggleState = this.HIDDEN_STATE;
      this.message = this.SHOW_MESSAGE;
    } else {
      this.display = this.displayMode.show;
      clearTimeout(this.loadTimer);
      this.toggleState = this.REVEALED_STATE;
      this.message = this.HIDE_MESSAGE;
      this.loadTimer = setTimeout(() => this.loadAlphabet(), this.LOAD_OFFSET);
    }
  }

  onAlphabetHidden(): void {
    this.display = this.isHidden
      ? this.displayMode.hidden
      : this.displayMode.show;
  }
}
