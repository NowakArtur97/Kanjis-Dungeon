import CharacterActionType from '../character/enums/character-action-type.enum';
import CharacterAction from '../character/models/character-action.model';
import Character from '../character/models/character.model';

const swordAction: CharacterAction = {
  action: 'sword',
  type: CharacterActionType.ATTACK,
  value: 5,
  apply(enemy: Character, player: Character): void {
    // TODO: Refactor with GameCard
    const { stats } = player;
    if (stats.currentShield > 0) {
      const remainingDamage =
        stats.currentShield < this.value ? this.value - stats.currentShield : 0;
      stats.currentShield -= this.value;
      if (stats.currentShield < 0) {
        stats.currentShield = 0;
      }
      stats.currentHealth -= remainingDamage;
    } else {
      stats.currentHealth -= this.value;
    }
  },
};
const shieldAction: CharacterAction = {
  action: 'shield',
  type: CharacterActionType.BUFF,
  value: 5,
  apply(character: Character, player: Character): void {
    character.stats.currentShield += this.value;
  },
};

export { swordAction, shieldAction };
