import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Radical from 'src/app/japanese/radical/models/radical.model';
import { environment } from 'src/environments/environment';

export default abstract class GenericFirebaseService<T extends Radical> {
  constructor(
    protected readonly collectionName: string,
    protected httpClient: HttpClient
  ) {}

  save = (models: T[]): Observable<T[]> =>
    this.httpClient.put<any>(
      `${environment.firebaseConfig.databaseURL}/${this.collectionName}.json`,
      models
    );

  getAll = (): Observable<T[]> =>
    this.httpClient.get<T[]>(
      `${environment.firebaseConfig.databaseURL}/${this.collectionName}.json`
    );
}
