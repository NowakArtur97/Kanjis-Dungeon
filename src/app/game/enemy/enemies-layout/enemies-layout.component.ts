import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

import Character from '../../character/models/character.model';

@Component({
  selector: 'app-enemies-layout',
  templateUrl: './enemies-layout.component.html',
  styleUrls: ['./enemies-layout.component.css'],
})
export class EnemiesLayoutComponent implements OnInit, OnDestroy {
  private enemiesSubscription$: Subscription;
  enemies: Character[];

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.enemiesSubscription$ = this.store
      .select('enemy')
      .subscribe(({ enemies }) => {
        if (enemies) {
          this.enemies = enemies;
        }
      });
  }

  ngOnDestroy(): void {
    this.enemiesSubscription$?.unsubscribe();
  }
}
