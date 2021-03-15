import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericFirebaseService from 'src/app/common/services/generic-firebase.service';

import Radical from '../models/radical.model';

@Injectable({ providedIn: 'root' })
export default class RadicalService extends GenericFirebaseService<Radical> {
  constructor(protected httpClient: HttpClient) {
    super('radicals', httpClient);
  }
}
