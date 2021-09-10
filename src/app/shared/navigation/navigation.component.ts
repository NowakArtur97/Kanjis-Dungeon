import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

import * as GameActions from '../../game/store/game.actions';
import * as QuizActions from '../../quiz/store/quiz.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  private readonly MAIN_PAGE_URL = '/';

  isOnMainPage: boolean;
  isActive = false;

  constructor(router: Router, private store: Store<AppStoreState>) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.isOnMainPage = event.url === this.MAIN_PAGE_URL;
        if (this.isOnMainPage) {
          this.isActive = true;
        }
      }
    });
  }

  ngOnInit(): void {}

  onToggleNavigation(): void {
    this.isActive = !this.isActive;
  }

  // TODO: TEST
  onChangeView(): void {
    this.store.dispatch(QuizActions.resetQuiz());
    this.store.dispatch(GameActions.resetGame());
  }
}
