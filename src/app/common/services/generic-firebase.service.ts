import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Radical from 'src/app/radical/models/radical.model';
import { environment } from 'src/environments/environment.secret';

export default abstract class GenericFirebaseService<T extends Radical> {
  private readonly COLLECTION_NAME: string;

  constructor(
    protected collectionName: string,
    protected httpClient: HttpClient
  ) {
    this.COLLECTION_NAME = collectionName;
  }

  save = (models: T[]): Observable<T[]> =>
    this.httpClient.put<any>(
      `${environment.firebaseConfig.databaseURL}/${this.COLLECTION_NAME}.json`,
      models
    );
}
