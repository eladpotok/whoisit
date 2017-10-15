import {AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserModel } from '../Models/user.model'

import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
 @Injectable()
 export class AuthService {

    private static _currentUser: UserModel;

     constructor( public afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform, public af: AngularFireDatabase) {
        // afAuth.authState.subscribe((user: firebase.User) => {
        // if (!user) {
        //     AuthService._currentUser = null;
        //     return;
        // }
        //     this.activeUser(user); 
        // });
    }

    public clearUser() {
        AuthService._currentUser = null;
    }

    public get currentUser(): UserModel {
        return AuthService._currentUser;
    }

    public get isAuthenticated() : Boolean {
        return this.currentUser != null && this.currentUser.isAuthenticated;
    }

   public signInWithFacebook() {
    
      if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential);

      })
      }
      else {
        return this.afAuth.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(res => console.log(res));
      }
  }

  public signOut() {
    this.afAuth.auth.signOut();
  }


  public addGuestUser(userName: string, roomKey: string) {

        let userModel: UserModel = 
        {
            displayName: userName,
            games: 0,
            totalPoints: 0,
            imageUrl: "assets/geust.png",
            level: "beginner",
            isAuthenticated: false
        }

    let userId = this.af.list(`users`).push(userModel).key;
    

    // let usersInRoomKey = this.af.list(`users/${roomKey}`).push(userModel).key;
    //this.af.object(`rooms/${roomKey}/users/key`).set(userId);
    this.af.object(`rooms/${roomKey}/users/${userId}`).set(0);

    userModel.$key = userId;
    AuthService._currentUser = userModel;

    this.getPointsInRoom(AuthService._currentUser, roomKey).subscribe( t=> {
        AuthService._currentUser.pointsInRoom = t.$value;
    });

    

    // this.getPointsInRoom(AuthService._currentUser, roomKey).subscribe( t=> {
        
    //     console.log("add guest " + t.pointsinRoom);
    //     AuthService._currentUser.pointsInRoom = t;
    // });
  }

  public getUser(userKey: string) : Observable<UserModel> {
      return this.af.object(`users/${userKey}`);
  }

  public getPointsInRoom(user: UserModel, roomKey: string) : Observable<any> {
    return this.af.object(`rooms/${roomKey}/users/${user.$key}`);
  }

  public activeUser(user: firebase.User) {

      let userModel: UserModel =
      {
            displayName: user.displayName,
            imageUrl: user.photoURL,
            isAuthenticated: true,
            $key: user.uid,
            totalPoints: 0,
            games: 0,
            level: "beginner"
      }

      AuthService._currentUser = userModel;
      
  } 
 }