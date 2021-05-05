import CharacterAction from './character-action.model';
import CharacterAnimation from './character-animation.model';
import CharacterStats from './character-stats.mode';
import CharacterStatus from './character-status.model';

export default interface Character {
  readonly name: string;
  readonly stats: CharacterStats;
  readonly animations: CharacterAnimation[];
  readonly statuses: CharacterStatus[];
  readonly action?: CharacterAction;
}
