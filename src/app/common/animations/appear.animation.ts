import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';

export default function appearTrigger(
  stateName: string,
  duration = 200
): AnimationTriggerMetadata {
  return trigger('appear', [
    state(stateName, style({ transform: 'scale(1)' })),
    transition(
      'void => *',
      animate(
        duration,
        keyframes([
          style({ transform: 'scale(0)', offset: 0 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ])
      )
    ),
  ]);
}
