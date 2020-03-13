import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Alert } from '../classes/alert';
import { AlertService } from './alert.service';
import { AlertType } from '../enums/alert-type.enum';
import { User } from '../classes/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  
  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.currentUser = of(null);

    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.collection('users').doc(user.user.uid);
        const updatedUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-63ead.appspot.com/o/default-profile-pic.jpg?alt=media&token=8dba1460-bffc-4220-9afa-64bca0780507'
        };
        userRef.set(updatedUser);
        return true;
      }).catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public logout(): void {
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out'));
  }
}
