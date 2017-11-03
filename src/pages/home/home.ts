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
import { CategoryModel, MemberModel } from '../../Models/category.model';

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
  alert: any;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private fb: Facebook, private platform: Platform, public alertCtrl: AlertController,
              public authService: AuthService, public viewCtrl: ViewController) {
    this.waitForRegistration();

    // platform.registerBackButtonAction(()=> this.myHandlerFunction() );
    platform.ready().then(() => {
        platform.registerBackButtonAction(() => {

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

  private pageGoBack() : Boolean {
    if(this.navCtrl.getActive().name != "ChooseCategoryPage" && 
       this.navCtrl.getActive().name != "GamePage" &&
       this.navCtrl.getActive().name != "ScorePage") {
      return true;
    }
    
    return false;
  }

  private showAlert() {
    
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
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
    
      this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
      return;
    }
    
    let roomKey = this.createRoom();
    
    this.addUserToRoom(roomKey);
  }

  private createRoom(): string {

    let settingsModel: SettingsModel = {
      timeElapsed: 8
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
        settingsKey: settingsKey
    }

    let roomKey = this.af.list(`/rooms`).push(roomModel).key;
    
    return roomKey;
  }

  private generateCode() : string {
    let codePool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (var i=0; i < 4; i++) {
      code += codePool.charAt(Math.random() * codePool.length);
    }
    return code;
  }

  private addUserToRoom(roomKey: string) {
    // check if the user is authenticated 
    if(!this.authService.isAuthenticated)
      this.authService.addGuestUser(this.currentUser.displayName, roomKey);
    else {
      this.af.object(`rooms/${roomKey}/users/${this.authService.currentUser.$key}`).set(0);
      this.authService.getPointsInRoom(this.currentUser, roomKey).subscribe(t=>{
        this.currentUser.pointsInRoom = t.$value;
      });
    }

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

      this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
      return;
    }

    let roomFound = false;
    let userFound = false;

    let subscription = this.af.list('/rooms', { preserveSnapshot: true}).subscribe(snapshots=>{
          snapshots.forEach(snapshot => {
              // we find the room by entry code
              if(snapshot.val().entryCode == this.roomEntryCode) {
                roomFound = true;
                // check if the room is not started yet
                if(!snapshot.val().isStarted) {
                  // iterate over the users so there is not a user with a same name
                  let sub = this.af.list(`rooms/${snapshot.key}/users`, { preserveSnapshot: true}).subscribe( t=> {
                    console.log("enter " + snapshot.key);
                    t.forEach(u => {
                      if(u != null) {
                        console.log("enter 2 " + u.key);
                        this.af.object(`users/${u.key}`).subscribe( user=>{
                          if(user.displayName == this.currentUser.displayName){
                            // this.showMsg("Sorry", "The given name is already exists in the room");
                            sub.unsubscribe();
                            userFound = true;
                            return;
                          }
                        });
                      } 
                    });
                    console.log("user added");
                    if(!userFound)
                      this.addUserToRoom(snapshot.key);
                    sub.unsubscribe();
                  });
                }
                else {
                  this.showMsg("Sorry", "The room is in during the game");
                }
                subscription.unsubscribe();
              }
          });
          if(!roomFound){
            this.showMsg("Room does not exist", "The key which is given is not exist!");
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

      this.currentUser = this.authService.currentUser;
  }

  public signOut() {

    this.authService.signOut();
  }

  public adminPanel() {
    this.navCtrl.push('AdminPage');
  }


  private myHandlerFunction(){
      let confirm = this.alertCtrl.create({
      title: 'Attention?',
      message: 'Are you sure that you want to leave the room?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            
        }
        },
        {
          text: 'Agree',
          handler: () => {
            // this.platform.registerBackButtonAction( () => { this.navCtrl.pop();  });
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }
  
}

