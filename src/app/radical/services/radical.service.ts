import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.secret';

import Radical from '../models/radical.model';

@Injectable({ providedIn: 'root' })
export default class RadicalService {
  private readonly COLLECTION_NAME = 'radicals';

  constructor(private httpClient: HttpClient) {}

  saveRadicals = (radicals: Radical[]): Observable<Radical[]> =>
    this.httpClient.put<any>(
      `${environment.firebaseConfig.databaseURL}/${this.COLLECTION_NAME}.json`,
      radicals
    );
}
