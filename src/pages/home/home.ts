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
  

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
                 private fb: Facebook, private platform: Platform, public alertCtrl: AlertController,
                 public authService: AuthService) {
    this.waitForRegistration();

    //this.isUserAuthorized = false;
    this.operation = "openRoom";
    this.isOpenRoomSelected = true;

    // this.createCategories();
  }

  private createCategories() {
    let pokemem0: MemberModel ={
      title: "Charmander",
      url: "assets/Pokemon/0.png",
    }
    let pokemem1: MemberModel ={
      title: "Bulbasaur",
      url: "assets/Pokemon/1.png",
    }
    let pokemem2: MemberModel ={
      title: "Squirtle",
      url: "assets/Pokemon/2.png",
    }
    let pokemem3: MemberModel ={
      title: "Pidgeot",
      url: "assets/Pokemon/3.png",
    }
    let pokemem4: MemberModel ={
      title: "Gigglipuff",
      url: "assets/Pokemon/4.png"
    }
    let pokemem5: MemberModel ={
      title: "Zapdos",
      url: "assets/Pokemon/5.png"
    }

    // let movie_mem1: MemberModel ={
    //   title: "Inception",
    //   url: "assets/Movies/0.png",
    // }
    // let movie_mem2: MemberModel ={
    //   title: "Titanic",
    //   url: "assets/Movies/1.png"
    // }
    // let movie_mem4: MemberModel ={
    //   title: "Shutter Island",
    //   url: "assets/Movies/2.png"
    // }
    // let movie_mem5: MemberModel ={
    //   title: "Taken",
    //   url: "assets/Movies/3.png"
    // }

    // let loca_mem1: MemberModel ={
    //   title: "Supermarket",
    //   url: "assets/Location/0.png",
    // }
    // let loca_mem2: MemberModel ={
    //   title: "Gas Station",
    //   url: "assets/Location/1.png"
    // }
    // let loca_mem3: MemberModel ={
    //   title: "Hospital",
    //   url: "assets/Location/2.png"
    // }
    // let loca_mem4: MemberModel ={
    //   title: "Records Shop",
    //   url: "assets/Location/3.png"
    // }


    // let car1: MemberModel ={
    //   title: "Popeye",
    //   url: "assets/Cartoon/0.png",
    // }
    // let car2: MemberModel ={
    //   title: "Homer Simpson",
    //   url: "assets/Cartoon/1.png"
    // }
    // let car3: MemberModel ={
    //   title: "Rick Sanchez",
    //   url: "assets/Cartoon/2.png"
    // }
    // let car4: MemberModel ={
    //   title: "Aladdin",
    //   url: "assets/Cartoon/3.png"
    // }
    //  let car5: MemberModel ={
    //   title: "Bubbles",
    //   url: "assets/Cartoon/4.png"
    // }

    //   let food1: MemberModel ={
    //   title: "Humborder",
    //   url: "assets/Food/0.png",
    // }
    // let food2: MemberModel ={
    //   title: "Pizza",
    //   url: "assets/Food/1.png"
    // }
    // let food3: MemberModel ={
    //   title: "Spagetti",
    //   url: "assets/Food/2.png"
    // }
    // let food4: MemberModel ={
    //   title: "Tost",
    //   url: "assets/Food/3.png"
    // }
    //  let food5: MemberModel ={
    //   title: "Salad",
    //   url: "assets/Food/4.png"
    // }

    // let celeb1: MemberModel ={
    //   title: "Leonardo DiCaprio",
    //   url: "assets/Celebs/0.png",
    // }
    // let celeb2: MemberModel ={
    //   title: "Mark Ruffalo",
    //   url: "assets/Celebs/1.png"
    // }
    // let celeb3: MemberModel ={
    //   title: "Amy Winehouse",
    //   url: "assets/Celebs/2.png"
    // }
    // let celeb4: MemberModel ={
    //   title: "Vince Vaughn",
    //   url: "assets/Celebs/3.png"
    // }
    //  let celeb5: MemberModel ={
    //   title: "Billy Joel",
    //   url: "assets/Celebs/4.png"
    // }

    // let carMembers: MemberModel[] = [];
    // carMembers.push(car1);
    // carMembers.push(car2);
    // carMembers.push(car3);
    // carMembers.push(car4);
    // carMembers.push(car5);

    // let foodMembers: MemberModel[] = [];
    // foodMembers.push(food1);
    // foodMembers.push(food2);
    // foodMembers.push(food3);
    // foodMembers.push(food4);
    // foodMembers.push(food5);

    // let celebsMemebers: MemberModel[] = [];
    // celebsMemebers.push(celeb1);
    // celebsMemebers.push(celeb2);
    // celebsMemebers.push(celeb3);
    // celebsMemebers.push(celeb4);
    // celebsMemebers.push(celeb5);
    

    // let members: MemberModel[] = [];
    // members.push(mem1);
    // members.push(mem2);
    // members.push(mem3);
    // let movieMembers: MemberModel [] = [];
    // movieMembers.push(movie_mem1);
    // movieMembers.push(movie_mem2);
    // movieMembers.push(movie_mem4);
    // movieMembers.push(movie_mem5);

    // let movieMembers: MemberModel [] = [];
    // movieMembers.push(movie_mem1);
    // movieMembers.push(movie_mem2);
    // movieMembers.push(movie_mem4);
    // movieMembers.push(movie_mem5);
    
    // let locationMembers: MemberModel [] = [];
    // locationMembers.push(loca_mem1);
    // locationMembers.push(loca_mem2);
    // locationMembers.push(loca_mem3);
    // locationMembers.push(loca_mem4);

    let pokemonMembers: MemberModel [] = [];
    pokemonMembers.push(pokemem0);
    pokemonMembers.push(pokemem1);
    pokemonMembers.push(pokemem2);
    pokemonMembers.push(pokemem3);
    pokemonMembers.push(pokemem4);
    pokemonMembers.push(pokemem5);

    let category1: CategoryModel = {
        title: "Pokemon",
        url: "assets/pokemonIcon.png",
        description: "Catch'em all!",
        members: pokemonMembers
    }
    // let category2: CategoryModel = {
    //     title: "Movies",
    //     url: "assets/moviesIcon.png",
    //     description: "Did you watch it?!",
    //     members: movieMembers
    // }
    // let category3: CategoryModel = {
        // title: "Locations",
        // url: "assets/locationIcon.png",
        // description: "What dould you take to...?",
        // members: locationMembers
    // }
    // let category4: CategoryModel = {
    //     title: "Food",
    //     url: "assets/foodIcon.png",
    //     description: "Yammmm....",
    //     members: foodMembers
    // }
    // let category5: CategoryModel = {
    //     title: "Celebs",
    //     url: "assets/celebIcon.png",
    //     description: "I know him!",
    //     members: celebsMemebers
    // }
    // let category6: CategoryModel = {
    //     title: "Cartoon",
    //     url: "assets/celebIcon.png",
    //     description: "POW!",
    //     members: carMembers
    // }
    
    this.af.list(`categories/`).push(category1);
    // this.af.list(`categories/`).push(category2);
    // this.af.list(`categories/`).push(category3);
    // this.af.list(`categories/`).push(category4);
    // this.af.list(`categories/`).push(category5);
    // this.af.list(`categories/`).push(category6);
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
    this.navCtrl.push('AboutPage');
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
              // we find the room by entry code
              if(snapshot.val().entryCode == this.roomEntryCode) {
                roomFound = true;
                // check if the room is not started yet
                if(!snapshot.val().isStarted) {
                  // iterate over the users so there is not a user with a same name
                  let sub = this.af.list(`rooms/${snapshot.key}/users`, { preserveSnapshot: true}).subscribe( t=>{
                    console.log("enter " + snapshot.key);
                    t.forEach(u => {
                      if(u != null) {
                        console.log("enter 2 " + u.key);
                        this.af.object(`users/${u.key}`).subscribe( user=>{
                          if(user.displayName == this.currentUser.displayName){
                            this.showMsg("Sorry", "The given name is already exists in the room");
                            sub.unsubscribe();
                            return;
                          }
                        });
                      } 
                    });

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
  
}

