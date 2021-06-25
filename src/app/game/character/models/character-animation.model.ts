export default interface CharacterAnimation {
  readonly spriteSheet: string;
  readonly numberOfFrames: number;
  readonly animationTimeInMiliseconds: number;
  readonly animationIterationCount: string;
  readonly spriteWidth: number;
  readonly spriteHeight: number;
  readonly spriteOffsetX?: number;
  readonly spriteOffsetY?: number;
}
