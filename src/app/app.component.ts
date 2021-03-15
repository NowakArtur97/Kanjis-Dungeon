import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
    this.store.dispatch(RadicalActions.saveRadicals());
    this.store.dispatch(VocabularyActions.saveVocabulary());
  }
}
