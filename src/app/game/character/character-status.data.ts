import { damageAction } from './character-action/character-action.data';
import CharacterStatusType from './enums/character-status-type.enum';
import CharacterStatus from './models/character-status.model';
import Character from './models/character.model';

const decreaseRemainingNumberOfActiveRounds = (
  characterStatus: CharacterStatus
) => characterStatus.remainingNumberOfActiveRounds--;

// TODO: Delete unused statuses from assets folder
const stunnedStatus: CharacterStatus = {
  spriteSheet: 'stunned',
  remainingNumberOfActiveRounds: 3,
  type: CharacterStatusType.STUNNED,
  apply(): void {
    decreaseRemainingNumberOfActiveRounds(this);
  },
};

const burnedStatus: CharacterStatus = {
  spriteSheet: 'burned',
  remainingNumberOfActiveRounds: 3,
  type: CharacterStatusType.BURN,
  apply(character: Character): void {
    damageAction(this.value, character);
    decreaseRemainingNumberOfActiveRounds(this);
  },
};

export { stunnedStatus, burnedStatus };
