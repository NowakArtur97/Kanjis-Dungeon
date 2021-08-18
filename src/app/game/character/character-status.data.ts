import CharacterStatus from './models/character-status.model';
import Character from './models/character.model';

// TODO: Delete unused statuses
const stunnedStatus: CharacterStatus = {
  spriteSheet: 'stunned',
  remainingNumberOfActiveRounds: 3,
};
const onFire: CharacterStatus = {
  spriteSheet: 'on_fire',
  remainingNumberOfActiveRounds: 3,
  apply(character: Character) {},
};

export { stunnedStatus };
