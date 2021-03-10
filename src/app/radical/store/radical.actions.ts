import { createAction, props } from '@ngrx/store';

import Radical from '../models/radical.model';

export const saveRadicals = createAction(
  '[Radical] Save Radicals',
  props<{ radicals: Radical[] }>()
);

export const fetchRadicals = createAction('[Radical] Fetch Radicals');
