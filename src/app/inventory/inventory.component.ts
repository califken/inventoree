import { Component, Input } from '@angular/core';

import { AuthService } from '../services/auth.service';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { map } from 'rxjs/operators';
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
export interface InventoryItem {
  iiid?: string;
  name?: string;
  location?: string;
  section?: string;
  bin?: string;
  itemnumber?: number;
  status?: boolean;
}
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  @Input() uid: string;

  name: string = 'Cookie';
  location: string = 'Rack';
  section: string = 'Shelf 3';
  bin: string = '1';
  itemnumber: number = 1;
  status: boolean;

  user$: Observable<any>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
    db: AngularFireDatabase,
    public auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.items = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.itemsRef = db.list(`users/${this.uid}/inventoryitems`);
          // Use snapshotChanges().map() to store the key
          return this.itemsRef
            .snapshotChanges()
            .pipe(
              map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
              )
            );
        } else {
          return of(null);
        }
      })
    );
  }
  addItem() {
    this.itemsRef.push({
      name: this.name,
      location: this.location,
      section: this.section,
      bin: this.bin,
      itemnumber: this.itemnumber,
      status: true
    });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
