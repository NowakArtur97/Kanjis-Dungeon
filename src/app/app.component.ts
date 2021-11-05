import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as KanjiActions from './japanese/kanji/store/kanji.actions';
import * as RadicalActions from './japanese/radical/store/radical.actions';
import * as VocabularyActions from './japanese/vocabulary/store/vocabulary.actions';
import * as QuizActions from './quiz/store/quiz.actions';
import AppStoreState from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppStoreState>) {}

  // TODO: TEST
  ngOnInit(): void {
    this.store.dispatch(QuizActions.getPreferredQuestionsFromStorage());
    if (environment.production || environment.shouldUpdateFirebase) {
      this.store.dispatch(RadicalActions.saveRadicals());
      this.store.dispatch(KanjiActions.saveKanji());
      this.store.dispatch(VocabularyActions.saveVocabulary());
    }
  }
}
