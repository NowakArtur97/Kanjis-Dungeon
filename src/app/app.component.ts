import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as KanjiActions from './kanji/store/kanji.actions';
import * as RadicalActions from './radical/store/radical.actions';
import AppStoreState from './store/app.state';
import * as VocabularyActions from './vocabulary/store/vocabulary.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    if (environment.shouldUpdateDatabase) {
      this.store.dispatch(RadicalActions.saveRadicals());
      this.store.dispatch(KanjiActions.saveKanji());
      this.store.dispatch(VocabularyActions.saveVocabulary());
    }
  }
}
