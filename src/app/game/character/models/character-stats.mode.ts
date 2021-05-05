import CharacterType from '../enums/character-type.enum';

export default interface CharacterStats {
  readonly maxHealth: number;
  currentHealth: number;
  readonly maxDamage: number;
  damage: number;
  currentShield: number;
  readonly type: CharacterType;
}
