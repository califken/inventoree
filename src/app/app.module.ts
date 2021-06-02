import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { AngularFireModule } from '@angular/fire';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { MdbModule } from 'mdb-angular-ui-kit';
import { InventoryComponent } from './inventory/inventory.component';
const environment = {
  firebase: {
    apiKey: 'AIzaSyDoOAhLYykXbuVI9C4-AE25LWUvctMbg-8',
    authDomain: 'fasttest-4adee.firebaseapp.com',
    databaseURL: 'https://fasttest-4adee-default-rtdb.firebaseio.com',
    projectId: 'fasttest-4adee',
    storageBucket: 'fasttest-4adee.appspot.com',
    messagingSenderId: '561377079921',
    appId: '1:561377079921:web:18c15c994309fba1cd21d0',
    measurementId: 'G-KHQ9R59YBZ'
  }
};
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MdbModule
  ],
  declarations: [AppComponent, HelloComponent, InventoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
