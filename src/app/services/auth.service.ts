import { Injectable } from '@angular/core';
import { AnimationDriver } from '@angular/animations/browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;   
   // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth,  private afs: AngularFirestore) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }
/* 
  loginGoogle(){
    try{
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }catch(error){
      console.log(error);
    }
  } */
 
  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Auth Service: loginUser: success');
            // this.router.navigate(['/dashboard']);
        })
        .catch(function(error: any ){
          if(error.code != null){
            console.log('Auth Service: login error...');
            console.log('error code', error.code);
            console.log('error', error);
          }
          return { isValid: false, message: error.message };      
        });
}


  signupUser(user: any): Promise<any> {
    let dos = this
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then(function(result: any){
            let emailLower = user.email.toLowerCase();

            dos.afs.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
                .set({
                    accountType: 'endUser',
                    displayName: user.displayName,
                    displayName_lower: user.displayName.toLowerCase(),
                    email: user.email,
                    email_lower: emailLower
                });

                result.user.sendEmailVerification();                    // immediately send the user a verification email
        })

      .catch(function(error: any) {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return { isValid: false, message: error.message };
        return {isValid: false, message: 'error desconocido'}
      });
  }
}
