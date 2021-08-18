import Character from './character.model';

export default interface CharacterStatus {
  readonly spriteSheet: string;
  remainingNumberOfActiveRounds: number;
  apply?(character: Character): void;
}
