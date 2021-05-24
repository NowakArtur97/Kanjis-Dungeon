import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-deck-energy',
  templateUrl: './deck-energy.component.html',
  styleUrls: ['./deck-energy.component.css'],
  animations: [
    trigger('animate', [
      state(
        'liquidDown',
        style({
          top: '100%',
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'liquidUp',
        style({
          top: '0%',
          transform: 'rotate(360deg)',
        }),
        {
          params: { liquidHeight: 0 },
        }
      ),
      transition('liquidDown <=> liquidUp', animate('2s'), {
        params: { liquidHeight: 0 },
      }),
    ]),
  ],
})
export class DeckEnergyComponent implements OnInit, OnDestroy {
  private deckEnergySubscription$: Subscription;
  maxEnergy: number;
  remainingEnergy: number;
  liquidHeight: number;
  animationState = 'liquidDown';

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.deckEnergySubscription$ = this.store
      .select('deck')
      .subscribe((deckState) => {
        if (deckState) {
          this.maxEnergy = deckState.maxEnergy;
          this.remainingEnergy = deckState.remainingEnergy;
          this.liquidHeight = this.maxEnergy / this.remainingEnergy;
        }
      });
  }

  ngOnDestroy(): void {
    this.deckEnergySubscription$?.unsubscribe();
  }

  onEndAnimation(event): void {
    // Loop animation
    this.animationState = 'liquidDown';
    if (event.toState === 'liquidDown') {
      setTimeout(() => {
        this.animationState = 'liquidUp';
      }, 0);
    }
  }
}
