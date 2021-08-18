import cloneDeep from 'lodash/cloneDeep';

import CharacterStatus from '../models/character-status.model';
import Character from '../models/character.model';

const damageAction = (value: number, character: Character) => {
  const { stats } = character;
  if (stats.currentShield > 0) {
    const remainingDamage =
      stats.currentShield < value ? value - stats.currentShield : 0;
    stats.currentShield -= value;
    if (stats.currentShield < 0) {
      stats.currentShield = 0;
    }
    stats.currentHealth -= remainingDamage;
  } else {
    stats.currentHealth -= value;
  }
};

const changeShieldAction = (value: number, character: Character) =>
  (character.stats.currentShield += value);

const addStatusAction = (
  value: number,
  status: CharacterStatus,
  character: Character
) => {
  const statusForAction: CharacterStatus = cloneDeep(status);
  statusForAction.value = value;
  character.statuses.push(statusForAction);
};

export { damageAction, changeShieldAction, addStatusAction };
