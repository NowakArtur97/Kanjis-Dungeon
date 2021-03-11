import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Radical from 'src/app/radical/models/radical.model';

@Injectable({ providedIn: 'root' })
export default class RadicalService {
  constructor(private firestore: AngularFirestore) {}

  private readonly COLLECTION_NAME = 'radicals';

  saveRadicals(radicals: Radical[]): Observable<Radical[]> {
    console.log(radicals);
    return new Observable<any>(() => {
      this.firestore.collection(this.COLLECTION_NAME).add(radicals);
    });
  }
}
