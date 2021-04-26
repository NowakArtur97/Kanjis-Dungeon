import CharacterAnimation from './character-animation.model';
import CharacterStats from './character-stats.mode';

export default interface Character {
  stats: CharacterStats;
  animations: CharacterAnimation[];
}
