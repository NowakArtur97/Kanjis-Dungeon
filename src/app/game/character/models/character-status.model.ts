import Character from './character.model';

export default interface CharacterStatus {
  readonly spriteSheet: string;
  remainingNumberOfActiveRounds: number;
  value?: number;
  apply?(character: Character): void;
}
