import CharacterAction from './character-action.model';
import CharacterAnimation from './character-animation.model';
import CharacterPosition from './character-position.model';
import CharacterStats from './character-stats.mode';
import CharacterStatus from './character-status.model';

export default interface Character {
  readonly name: string;
  stats: CharacterStats;
  readonly animations: CharacterAnimation[];
  readonly statuses: CharacterStatus[];
  currentAction?: CharacterAction;
  readonly allActions?: CharacterAction[];
  position?: CharacterPosition;
}
