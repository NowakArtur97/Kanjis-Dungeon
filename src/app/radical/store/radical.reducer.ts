import { Action, createReducer, on } from '@ngrx/store';

import Radical from '../models/radical.model';
import RADICALS from '../radical.data';
import * as RadicalActions from './radical.actions';

export interface RadicalStoreState {
  radicals: Radical[];
}

const initialState: RadicalStoreState = {
  radicals: RADICALS,
};

const _radicalReducer = createReducer(
  initialState,

  on(RadicalActions.setRadicals, (state, { radicals }) => ({
    ...state,
    radicals: [...radicals],
  }))
);

export function radicalReducer(
  state: RadicalStoreState,
  action: Action
): RadicalStoreState {
  return _radicalReducer(state, action);
}
