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
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
                 private fb: Facebook, private platform: Platform, public alertCtrl: AlertController,
                 public authService: AuthService) {

    //this.isUserAuthorized = false;
    this.operation = "openRoom";
    this.isOpenRoomSelected = true;
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
 

    if(!this.authService.isAuthenticated)
      this.authService.addGuestUser(this.userName, roomKey);
   

    this.navCtrl.push('LobbyPage', {
        roomKey: roomKey
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

      this.authService.signInWithFacebook();
  }

  public signOut() {

    this.authService.signOut();
  }
}

