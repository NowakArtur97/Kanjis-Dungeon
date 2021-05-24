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
          top: '{{liquidHeight}}%',
          transform: 'rotate(0deg)',
        }),
        {
          params: { liquidHeight: 0 },
        }
      ),
      state(
        'liquidUp',
        style({
          top: '{{liquidMinHeight}}%',
          transform: 'rotate(360deg)',
        }),
        {
          params: { liquidMinHeight: 0 },
        }
      ),
      transition('liquidDown <=> liquidUp', animate('1s'), {
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
  liquidMinHeight: number;
  private LIQUID_HEIGHT_MODIFIER = 10;
  animationState = 'liquidDown';
  private LUQUID_UP_STATE = 'liquidUp';
  private LUQUID_DOWN_STATE = 'liquidDown';

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.deckEnergySubscription$ = this.store
      .select('deck')
      .subscribe((deckState) => {
        if (deckState) {
          this.maxEnergy = deckState.maxEnergy;
          this.remainingEnergy = deckState.remainingEnergy;
          this.liquidHeight = (this.remainingEnergy / this.maxEnergy) * 100;
          this.liquidMinHeight =
            this.liquidHeight + this.LIQUID_HEIGHT_MODIFIER;
        }
      });
  }

  ngOnDestroy(): void {
    this.deckEnergySubscription$?.unsubscribe();
  }

  onEndAnimation(event): void {
    // Loop animation
    this.animationState = this.LUQUID_DOWN_STATE;
    if (event.toState === this.LUQUID_DOWN_STATE) {
      setTimeout(() => {
        this.animationState = this.LUQUID_UP_STATE;
      }, 0);
    }
  }
}
