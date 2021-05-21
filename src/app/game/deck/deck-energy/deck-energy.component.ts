import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-deck-energy',
  templateUrl: './deck-energy.component.html',
  styleUrls: ['./deck-energy.component.css'],
})
export class DeckEnergyComponent implements OnInit {
  private deckEnergySubscription$: Subscription;
  maxEnergy: number;
  remainingEnergy: number;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.deckEnergySubscription$ = this.store
      .select('deck')
      .subscribe((deckState) => {
        if (deckState) {
          this.maxEnergy = deckState.maxEnergy;
          this.remainingEnergy = deckState.remainingEnergy;
        }
      });
  }

  ngOnDestroy(): void {
    this.deckEnergySubscription$?.unsubscribe();
  }
}
