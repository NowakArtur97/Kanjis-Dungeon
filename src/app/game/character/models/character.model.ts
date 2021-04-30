import CharacterAction from './character-action.model';
import CharacterAnimation from './character-animation.model';
import CharacterStats from './character-stats.mode';
import CharacterStatus from './character-status.model';

export default interface Character {
  name: string;
  stats: CharacterStats;
  animations: CharacterAnimation[];
  statuses: CharacterStatus[];
  action?: CharacterAction;
}
