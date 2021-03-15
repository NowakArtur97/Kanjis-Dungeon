import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import AppStoreState from '../store/app.state';
import Radical from './models/radical.model';
import * as RadicalActions from './store/radical.actions';

@Injectable({ providedIn: 'root' })
export default class RadicalResolver
  implements Resolve<{ radicals: Radical[] }> {
  constructor(private actions$: Actions, private store: Store<AppStoreState>) {}

  resolve = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { radicals: Radical[] }
    | Observable<{ radicals: Radical[] }>
    | Promise<{ radicals: Radical[] }> =>
    this.store.select('radical').pipe(
      take(1),
      switchMap(({ radicals }) => {
        if (radicals?.length < 10) {
          this.store.dispatch(RadicalActions.fetchRadicals());
          return this.actions$.pipe(
            ofType(RadicalActions.setRadicals),
            take(1)
          );
        } else {
          return of({ radicals });
        }
      })
    );
}
