import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ViewController  } from 'ionic-angular';
import { RoomModel } from '../../Models/room.model'
import { UserModel } from '../../Models/user.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import {AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';
import { CardModel }  from '../../Models/card.model';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SettingsModel } from '../../Models/settings.model';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../services/messages.service';
import { RoomsService } from '../../services/rooms.service';
import { CategoryModel, MemberModel } from '../../Models/category.model';
import { UrlSerializer } from 'ionic-angular/navigation/url-serializer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  roomItems: FirebaseListObservable<any[]>;
  roomsUsers: FirebaseListObservable<any[]>;
  roomModel: Observable<RoomModel>;
  roomName: string;
  roomEntryCode: string;
  openRoomTab: Component;
  isOpenRoomSelected: Boolean;
  operation: any;
  currentUser: UserModel = new UserModel;
  usersInRoom: UserModel[];
  isDebug: boolean = false;
  alert: any = null;
  isAlertShown: boolean;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private fb: Facebook, private platform: Platform, public alertCtrl: AlertController, public msgService: MessagesService,
              public authService: AuthService, public viewCtrl: ViewController, public roomService: RoomsService) {
    

    this.waitForRegistration();

    this.isDebug = this.authService.IsDebug;

    platform.ready().then(() => {
        platform.registerBackButtonAction(() => {
          if(this.alert != null)
            return;
          if(navCtrl.getActive().name == "HomePage") {
            this.showExitAlert();
          }
          else if(this.pageGoBack()){
            navCtrl.pop();
          }
          else {
            this.showAlert();
          }
        });
    });
    this.operation = "openRoom";
    this.isOpenRoomSelected = true;
  }

  ionViewDidEnter() {
    this.roomEntryCode = null;
    this.roomName = null;
  }

  private pageGoBack() : Boolean {
    if(this.navCtrl.getActive().name != "ChooseCategoryPage" && 
       this.navCtrl.getActive().name != "GamePage"    &&
       this.navCtrl.getActive().name != "ScorePage" && 
       this.navCtrl.getActive().name != "GuessPage" && 
       this.navCtrl.getActive().name != "LobbyPage") {
      return true;
    }
    
    return false;
  }

  private showAlert() {
    
    this.alert = this.alertCtrl.create({
      title: 'Leave?',
      message: 'Do you want to leave the room?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Leave',
          handler: () => {
            this.alert =null;
            console.log("the current user is " + this.authService.currentUser);
            console.log("is owner " + this.authService.currentUser.isOwner); 
            if(this.authService.currentUser.isOwner) {
              // alert that the room is closed
              console.log("you are owner " + RoomsService.roomKey);
              this.af.object(`rooms/${RoomsService.roomKey}/isClosed`).set(true);
              this.roomService.leaveRoom(true);
            }
            else {
              this.roomService.leaveRoom(false);
            }
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    this.alert.present();
  }

  private showExitAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }

  private waitForRegistration() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
          this.clearUser();
          return;
      }
      this.authService.activeUser(user); 
      if(this.authService.isAuthenticated){
        this.currentUser = this.authService.currentUser;
      }
      });
  }

  private clearUser() {
    this.authService.clearUser();
    this.currentUser.displayName = "";
    this.currentUser.isAuthenticated = false;
  }

  private openRoomSubmit() {
    if(this.roomName == null ||
       this.currentUser.displayName == null) {
    
      this.msgService.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
      return;
    }
    
    let roomKey = this.createRoom();
    
    this.addUserToRoom(roomKey, true);
  }

  private createRoom(): string {

    let settingsModel: SettingsModel = {
      timeElapsed: 7,

    }
    
    // add new settings to db
    let settingsKey = this.af.list(`settings`).push(settingsModel).key;

    let roomModel: RoomModel = 
    {
        owner: this.currentUser.displayName,
        roomName: this.roomName,
        categoryName: "empty",
        entryCode: this.generateCode(),
        isCategorySelected: false,
        users: [],
        spy: "",
        settingsKey: settingsKey,
    }

    let roomKey = this.af.list(`/rooms`).push(roomModel).key;
    
    return roomKey;
  }

  private generateCode() : string {
    let codePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //abcdefghijklmnopqrstuvwxyz
    let code = "";
    for (var i=0; i < 4; i++) {
      code += codePool.charAt(Math.random() * codePool.length);
    }
    return code;
  }

  private addUserToRoom(roomKey: string, isOwner: boolean) {
    // check if the user is authenticated 
    if(!this.authService.isAuthenticated)
      this.authService.addGuestUser(this.currentUser.displayName, roomKey, isOwner);
    else {
      this.af.object(`rooms/${roomKey}/users/${this.authService.currentUser.$key}`).set(0);
      this.authService.getPointsInRoom(this.currentUser, roomKey).subscribe(t=>{
        this.currentUser.pointsInRoom = t.$value;
      });
    }
    console.log("go to lobby with key " + roomKey);
    this.navCtrl.push('LobbyPage', {
        roomKey: roomKey
    });
  }

  openRoom() {
    this.isOpenRoomSelected = true;
  }

  nameExists() : boolean {
    return this.usersInRoom.map(t=>t.displayName).indexOf(this.currentUser.displayName) != -1;
    
  }

  public about() {
    this.navCtrl.push('InfoPage');
  }

  private joinRoomSubmit() {

     if(this.currentUser.displayName == null ||
       this.roomEntryCode == null) {

      this.msgService.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
      return;
    }

    let roomFound = false;
    let userFound = false;

    let subscription = this.af.list('/rooms', { preserveSnapshot: true}).subscribe(snapshots=>{
          snapshots.forEach(snapshot => {
              // we find the room by entry code
              if(snapshot.val().entryCode != null && snapshot.val().entryCode.toUpperCase() == this.roomEntryCode.toUpperCase()) {
                roomFound = true;
                // check if the room is not started yet
                if(!snapshot.val().isStarted) {
                  if(!snapshot.val().isClosed) {
                    // iterate over the users so there is not a user with a same name
                    let sub = this.af.list(`rooms/${snapshot.key}/usernames`, { preserveSnapshot: true}).subscribe( t=> {
                      t.forEach(u => {
                        if(u != null) {
                          if(u.val() == this.currentUser.displayName) {
                            this.msgService.showMsg("Sorry", "The given name is already exists in the room");
                            sub.unsubscribe();
                            userFound = true;
                            return;
                          }
                        } 
                      });
                      if(!userFound)
                        this.addUserToRoom(snapshot.key, false);
                      sub.unsubscribe();
                    });
                  }
                  else {
                    this.msgService.showMsg("Sorry", "The room is no longer activated");
                  }
                }
                else {
                  this.msgService.showMsg("Sorry", "The room is in during the game");
                }
                subscription.unsubscribe();
              }
          });
          if(!roomFound){
            this.msgService.showMsg("Room does not exist", "The key which is given is not exist!");
            subscription.unsubscribe();
          }
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

  public signInWithFacebook() {

      this.authService.signInWithFacebook();

      this.currentUser = this.authService.currentUser;
  }

  public signOut() {

    this.authService.signOut();
  }

  public adminPanel() {
    this.navCtrl.push('AdminPage');
  }
}

