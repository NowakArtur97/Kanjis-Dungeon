export default interface CharacterStats {
  readonly maxHealth: number;
  currentHealth: number;
  readonly maxDamage: number;
  damage: number;
  currentShield: number;
  readonly isEnemy: boolean;
}
