import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RoomModel } from '../../Models/room.model'
import { UserModel } from '../../Models/user.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import {AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';
import { CardModel }  from '../../Models/card.model';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  roomItems: FirebaseListObservable<any[]>;
  userItems:  FirebaseListObservable<any[]>;
  roomsUsers: FirebaseListObservable<any[]>;
  userName: string;
  roomModel: Observable<RoomModel>;
  roomName: string;
  roomEntryCode: string;
  openRoomTab: Component;
  isOpenRoomSelected: Boolean;
  operation: any;
  photoUrl: string;
  displayName: string;
  isUserAuthorized: Boolean;
  userId: string;


  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
                 private fb: Facebook, private platform: Platform, public alertCtrl: AlertController) {

    this.isUserAuthorized = false;
    this.operation = "openRoom";
    this.isOpenRoomSelected = true;
   
    // let spy: CardModel = {
    //   title: "Spy",
    //   link: "https://firebasestorage.googleapis.com/v0/b/spycookie-31a6f.appspot.com/o/category%2Fspy.png?alt=media&token=8cf47740-c7a2-4f51-a961-eb9145f8066d",
    //   category: "All"
    // }
    
    // TODO: check if its raised with any user which sign in.
    // Maybe I should detect it by its uid.
    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }

      this.activeUser(user); 
    });
  }

// TODO: need to contain only one object "user" instead of all of its fields.
  private activeUser(user: firebase.User) {
    this.userName = user.displayName;
    this.displayName = user.displayName;
    this.photoUrl = user.photoURL;
    this.isUserAuthorized = true;
    this.userId = user.uid;
  }

  private openRoomSubmit() {
    if(this.roomName == null ||
       this.userName == null) {
    
      this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
      return;
    }
    
    let roomKey = this.createRoom();
    this.addUserToRoom(roomKey);
  }

  private createRoom(): string {

    let roomModel: RoomModel = 
    {
        owner: this.userName,
        roomName: this.roomName,
        categoryName: "empty",
        entryCode: this.roomName.substring(0,4),
    }

    let roomKey = this.af.list(`/rooms`).push(roomModel).key;
    return roomKey;
  }

  private addUserToRoom(roomKey: string) {
 
    let userId = this.userId  ;

    if(!this.isUserAuthorized) {
         let userModel: UserModel = 
            {
                displayName: this.userName,
                games: 0,
                totalPoints: 0,
                imageUrl: "assets/geust.png",
                level: "beginner"
            }

        userId = this.af.list(`users`).push(userModel).key;
    }

    // let usersInRoomKey = this.af.list(`users/${roomKey}`).push(userModel).key;
    //this.af.object(`rooms/${roomKey}/users/key`).set(userId);
    this.af.object(`rooms/${roomKey}/users/${userId}`).set(true);

    this.navCtrl.push('LobbyPage', {
        roomKey: roomKey,
        userName: this.userName
    });
  }

  openRoom() {
    this.isOpenRoomSelected = true;
  }

  private joinRoomSubmit() {

     if(this.userName == null ||
       this.roomEntryCode == null) {
    

      this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
      return;
    }

    let roomFound = false;

    let subscription = this.af.list('/rooms', { preserveSnapshot: true}).subscribe(snapshots=>{
          snapshots.forEach(snapshot => {
              if(snapshot.val().entryCode == this.roomEntryCode) {
                roomFound = true;
                if(!snapshot.val().isStarted) {
                  this.addUserToRoom(snapshot.key);
                  subscription.unsubscribe();
                  return;
                }
                else {
                  this.showMsg("Sorry", "The room is in during the game");
                }
                subscription.unsubscribe();
              }
          });
          if(!roomFound)
            this.showMsg("Room does not exist", "The key which is given is not exist!");
      });
  }

  joinRoom() {
    this.isOpenRoomSelected = false;    
  }

  submitRoom() {

    if(this.isOpenRoomSelected) {
        this.openRoomSubmit();
    }
    else {
        this.joinRoomSubmit();
    }
  }

  private showMsg(title: string, subTitle: string) {
     let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
          });
      alert.present();
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
}

