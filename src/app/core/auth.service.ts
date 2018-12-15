import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


//
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: any;

    constructor(public afAuth: AngularFireAuth, private router: Router){}

    LoginFb(){
      return new Promise<any>((resolve, reject) => {
        let provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          console.log('Nice, it worked!');
          this.router.navigate(['/members']);
        }, err => {
          console.log(err);
          reject(err);
        })
      })
   }

   LoginGoogle(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        console.log('Nice, it worked!');
        this.router.navigate(['/members']);
      })
    })
  }

  onSubmit(form){
    if(form.valid) {
      console.log(form.value);
      return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then(res => {
        resolve(res);
        console.log("successful");
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
    })
  })
  }
}

  
}