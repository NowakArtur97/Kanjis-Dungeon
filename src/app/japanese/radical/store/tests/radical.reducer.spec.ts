import CharacterType from 'src/app/japanese/common/enums/character-type.enum';

import Radical from '../../models/radical.model';
import * as RadicalActions from '../radical.actions';
import { radicalReducer, RadicalStoreState } from '../radical.reducer';

const radical1: Radical = {
  characters: '一',
  meanings: ['ground'],
  type: CharacterType.RADICAL,
};
const radical2: Radical = {
  characters: '二',
  meanings: ['two'],
  type: CharacterType.RADICAL,
};
const radicals = [radical1, radical2];
const initialState: RadicalStoreState = {
  radicals: [],
};
const stateWithRadicals: RadicalStoreState = {
  radicals,
};

describe('radicalReducer', () => {
  describe('RadicalActions.setRadicals', () => {
    it('should store radicals', () => {
      const action = RadicalActions.setRadicals({ radicals });
      const actualState = radicalReducer(initialState, action);
      const expectedState = { ...stateWithRadicals };

      expect(actualState).toEqual(expectedState);
      expect(actualState.radicals[0]).toEqual(radical1);
      expect(actualState.radicals[1]).toEqual(radical2);
      expect(actualState.radicals.length).toBe(2);
    });

    it('should store empty radicals list', () => {
      const emptyRadicalsList = [];
      const action = RadicalActions.setRadicals({
        radicals: emptyRadicalsList,
      });
      const actualState = radicalReducer(initialState, action);
      const expectedState = { ...initialState };

      expect(actualState).toEqual(expectedState);
      expect(actualState.radicals).not.toContain(radical1);
      expect(actualState.radicals).not.toContain(radical2);
      expect(actualState.radicals.length).toBe(0);
    });
  });
});
