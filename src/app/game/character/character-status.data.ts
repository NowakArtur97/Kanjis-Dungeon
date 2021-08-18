import { damageAction } from './character-action/character-action.data';
import CharacterStatus from './models/character-status.model';
import Character from './models/character.model';

const decreaseRemainingNumberOfActiveRounds = (
  characterStatus: CharacterStatus
) => characterStatus.remainingNumberOfActiveRounds--;

// TODO: Delete unused statuses from assets folder
const stunnedStatus: CharacterStatus = {
  spriteSheet: 'stunned',
  remainingNumberOfActiveRounds: 3,
  apply(value: number, character: Character) {
    decreaseRemainingNumberOfActiveRounds(this);
  },
};

const onFireStatus: CharacterStatus = {
  spriteSheet: 'on_fire',
  remainingNumberOfActiveRounds: 3,
  apply(value: number, character: Character) {
    damageAction(value, character);
    decreaseRemainingNumberOfActiveRounds(this);
  },
};

export { stunnedStatus, onFireStatus };
