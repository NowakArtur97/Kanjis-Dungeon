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
          bottom: '-{{liquidHeight}}%',
          transform: 'rotate(0deg)',
        }),
        {
          params: { liquidHeight: 0 },
        }
      ),
      state(
        'liquidUp',
        style({
          bottom: '-{{liquidMinHeight}}%',
          transform: 'rotate(360deg)',
        }),
        {
          params: { liquidMinHeight: 0 },
        }
      ),
      transition('liquidDown <=> liquidUp', animate('1s')),
    ]),
  ],
})
export class DeckEnergyComponent implements OnInit, OnDestroy {
  private deckEnergySubscription$: Subscription;
  maxEnergy: number;
  remainingEnergy: number;
  liquidHeight: number;
  liquidMinHeight: number;
  private readonly LIQUID_TOP_OFFSET = 100;
  private readonly LIQUID_HEIGHT_MODIFIER = 5;
  animationState = 'liquidDown';
  private readonly LUQUID_UP_STATE = 'liquidUp';
  private readonly LUQUID_DOWN_STATE = 'liquidDown';

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.deckEnergySubscription$ = this.store
      .select('deck')
      .subscribe((deckState) => {
        if (deckState) {
          this.maxEnergy = deckState.maxEnergy;
          this.remainingEnergy = deckState.remainingEnergy;
          this.liquidHeight =
            this.LIQUID_TOP_OFFSET -
            (this.remainingEnergy / this.maxEnergy) * 100;
          this.liquidMinHeight =
            this.liquidHeight + this.LIQUID_HEIGHT_MODIFIER;
          // TODO: DeckEnergyComponent: Change liquid height with animation when reduced/increased
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
