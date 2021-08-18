import { changeShieldAction, damageAction } from '../character/character-action/character-action.data';
import CharacterActionType from '../character/enums/character-action-type.enum';
import CharacterAction from '../character/models/character-action.model';
import Character from '../character/models/character.model';

const swordAction: CharacterAction = {
  action: 'melee_attack',
  type: CharacterActionType.ATTACK,
  value: 5,
  apply(enemy: Character, player: Character): void {
    damageAction(this.value, player);
  },
};
const shieldAction: CharacterAction = {
  action: 'defence',
  type: CharacterActionType.BUFF,
  value: 5,
  apply(character: Character, player: Character): void {
    changeShieldAction(this.value, character);
  },
};

export { swordAction, shieldAction };
