import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';
import { constants } from 'src/assets/constants';
import { BackendService } from './backend.service';
import { HelperService } from './helper.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
adminLogin = false; //for debug
isUserLogin = false;
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone,
    private backendService : BackendService,
    private helperService: HelperService
  ) { 
    
    
  }

  signUpUser(email: string, password: string, userName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(data =>{
      data.user?.updateProfile({displayName: userName})
      this.sendVerificationMail()  
    });
  }

  signInUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
    
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.helperService.removeAllLocalStorage()
      this.isUserLogin = false
      this.router.navigate([''])
    });
  }

  signOutAdmin()
  {
    this.adminLogin = false
    this.router.navigate(['admin'])
  }
  get isUserLoggedIn(): boolean {
    const localEmailValue = localStorage.getItem("Zr-Auth-Email");
    return localEmailValue != null
  }

 

  setUserDataToFireStore(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
   
    return userRef.set(user, {
      merge: true,
    });
  }
  
}

