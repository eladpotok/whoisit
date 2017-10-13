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
import { CategoryModel, MemberModel } from '../../Models/category.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  roomItems: FirebaseListObservable<any[]>;
  userItems:  FirebaseListObservable<any[]>;
  roomsUsers: FirebaseListObservable<any[]>;
 // userName: string;
  roomModel: Observable<RoomModel>;
  roomName: string;
  roomEntryCode: string;
  openRoomTab: Component;
  isOpenRoomSelected: Boolean;
  operation: any;
  currentUser: UserModel = new UserModel;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
                 private fb: Facebook, private platform: Platform, public alertCtrl: AlertController,
                 public authService: AuthService) {
    
   
    this.waitForRegistration();

    //this.isUserAuthorized = false;
    this.operation = "openRoom";
    this.isOpenRoomSelected = true;

   //this.createCategories();
  }

  private createCategories() {
    let mem1: MemberModel ={
      title: "Charmander",
      url: "assets/Pokemon/1.png",
    }
    let mem2: MemberModel ={
      title: "Bulbasaur",
      url: "assets/Pokemon/2.png"
    }
    let mem3: MemberModel ={
      title: "Squirtle",
      url: "assets/Pokemon/3.png"
    }
    let members: MemberModel[] = [];
    members.push(mem1);
    members.push(mem2);
    members.push(mem3);
    let category1: CategoryModel = {
        title: "Pokemon",
        url: "assets/pokemonIcon.png",
        description: "Catch'em all!",
        members: members
    }
    let category2: CategoryModel = {
        title: "Movies",
        url: "assets/moviesIcon.png",
        description: "Did you watch it?!",
        members: []
    }
    let category3: CategoryModel = {
        title: "Locations",
        url: "assets/locationIcon.png",
        description: "What dould you take to...?",
        members: []
    }
    let category4: CategoryModel = {
        title: "Food",
        url: "assets/foodIcon.png",
        description: "Yammmm....",
        members: []
    }
    let category5: CategoryModel = {
        title: "Celebs",
        url: "assets/celebIcon.png",
        description: "I know him!",
        members: []
    }
    
    this.af.list(`categories/`).push(category1);
    this.af.list(`categories/`).push(category2);
    this.af.list(`categories/`).push(category3);
    this.af.list(`categories/`).push(category4);
    this.af.list(`categories/`).push(category5);
  }

  private waitForRegistration() {
      this.afAuth.authState.subscribe((user: firebase.User) => {
        if (!user) {
            this.authService.clearUser();
            return;
        }
            this.authService.activeUser(user); 
            if(this.authService.isAuthenticated){
              this.currentUser = this.authService.currentUser;
            }
        });
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

    let roomModel: RoomModel = 
    {
        owner: this.currentUser.displayName,
        roomName: this.roomName,
        categoryName: "empty",
        entryCode: this.generateCode(),
        isCategorySelected: false,
        users: [],
        spy: ""
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

  private joinRoomSubmit() {

     if(this.currentUser.displayName == null ||
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

      this.currentUser = this.authService.currentUser;
  }

  public signOut() {

    this.authService.signOut();
  }
}

