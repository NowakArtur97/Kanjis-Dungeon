import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export default function slideInTrigger(
  defaultState: string,
  defaultTransform: string,
  animatedState: string,
  animatedTransform: string,
  duration = 200
): AnimationTriggerMetadata {
  return trigger('slide', [
    state(
      defaultState,
      style({
        transform: defaultTransform,
      })
    ),
    state(animatedState, style({ transform: animatedTransform })),
    transition(`${defaultState} <=> ${animatedState}`, animate(duration)),
  ]);
}
