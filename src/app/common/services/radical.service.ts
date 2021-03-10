import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export default class RadicalService {
  constructor(private firestore: AngularFirestore) {}
}
