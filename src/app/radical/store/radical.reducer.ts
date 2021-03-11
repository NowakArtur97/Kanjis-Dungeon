import { Action, createReducer, on } from '@ngrx/store';

import Radical from '../models/radical.model';
import * as RadicalActions from './radical.actions';

export interface RadicalStoreState {
  radicals: Radical[];
}

const initialState: RadicalStoreState = {
  radicals: [
    { id: 1, radical: '一', meanings: ['ground'] },
    { id: 2, radical: '二', meanings: ['two'] },
  ],
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
