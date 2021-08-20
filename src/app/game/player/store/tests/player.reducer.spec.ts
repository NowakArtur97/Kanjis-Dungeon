import CharacterType from 'src/app/game/character/enums/character-type.enum';
import Character from 'src/app/game/character/models/character.model';

import * as PlayerActions from '../player.actions';
import { playerReducer, PlayerStoreState } from '../player.reducer';

describe('playerReducer', () => {
  const player: Character = {
    name: 'example-character',
    stats: {
      currentHealth: 100,
      maxHealth: 100,
      damage: 20,
      maxDamage: 22,
      currentShield: 10,
      type: CharacterType.PLAYER,
    },
    animations: [
      {
        spriteSheet: 'idle',
        numberOfFrames: 4,
        animationTimeInMiliseconds: 600,
        animationIterationCount: 'Infinite',
        spriteWidth: 16,
        spriteHeight: 27,
      },
    ],
    statuses: [],
  };
  const initialState: PlayerStoreState = {
    player,
  };
  describe('PlayerActions.setPlayer', () => {
    it('should set player', () => {
      const updatedPlayer = {
        ...player,
        stats: {
          currentHealth: 100,
          maxHealth: 100,
          damage: 30,
          maxDamage: 25,
          currentShield: 20,
          type: CharacterType.PLAYER,
        },
      };
      const stateWithUpdatedPlayer: PlayerStoreState = {
        player: updatedPlayer,
      };

      const action = PlayerActions.setPlayer({ player: updatedPlayer });
      const actualState = playerReducer(initialState, action);
      const expectedState = { ...stateWithUpdatedPlayer };

      expect(actualState).toEqual(expectedState);
      expect(actualState.player).toEqual(updatedPlayer);
    });
  });
});
