import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../Models/user.model';
import { RoomModel } from '../../Models/room.model';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service'
import { RoomsService } from '../../services/rooms.service';
import { RoundModel } from '../../Models/round.model';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {

  roomKey: string;
  roomsItems: Observable<RoomModel>;
  users: Observable<UserModel[]>;
  isOwner: Boolean;
  selectorUser: string; 
  spyUser: string;
  roomName: string;
  entryCode: string;
  usersInRoomKey: string;
  usersModel: UserModel[] = [];
  usersCount: number;
  loader: any;

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
              public af: AngularFireDatabase, private alertCtrl: AlertController, private authService: AuthService,
              private roomService: RoomsService, public loadingCtrl: LoadingController) {
                
    console.log("enter to lobby ctor");
    // Get thr paramters from the navigation controller
    this.roomKey = this.navParams.get('roomKey');


    
    // get the users in the current room
    af.list(`rooms/${this.roomKey}/users`).subscribe( snapshots => {
      this.usersModel = [];
      this.usersCount = snapshots.length;
      snapshots.forEach( snapshot=> {
        let userId = snapshot.$key;
        let points = snapshot.$value;
        
        af.object(`users/${userId}`).subscribe( t=> {
          t.pointsInRoom = points;
          this.usersModel.push(t);
        });
      });
    });

    // Get the current room
    af.object(`/rooms/${this.roomKey}`).subscribe( t=> {
      this.roomName = t.roomName;
      if(t.owner == authService.currentUser.displayName)
          this.isOwner = true;
      else {
          this.roomService.updateUsersInRoom(this.roomKey);      
      }

          this.entryCode = t.entryCode;
    })
    
    

    // wait till the selector will select a category
    let leaveLobby = af.object(`rooms/${this.roomKey}/isStarted`).subscribe( t=> {
      console.log("is started changed to " + t.$value);
      if(t.$value) {
          this.af.object(`rooms/${this.roomKey}/selector`).subscribe(  selector => {
            console.log("selector changed to " + selector.$value);
            if(selector.$value == authService.currentUser.displayName) {
           //   leaveLobby.unsubscribe();
              this.dismissLoading();
              this.navCtrl.push('ChooseCategoryPage', {
                roomKey: this.roomKey,
                spy: this.spyUser
              });
            }
            else{
              console.log("before isCategorySelected");
              af.object(`rooms/${this.roomKey}/isCategorySelected`).subscribe(catSelected => {
                  console.log("isstarted is " + t.$value);
                console.log("selector is " + selector.$value);
                console.log("isCategorySelected to " + catSelected.$value);
              if(catSelected.$value) {
                // if(this.selectorUser == authService.currentUser.$key) {
                  // go to the loading game...
                  console.log("gp to game page");
                  this.dismissLoading();
                  this.navCtrl.push('GamePage', {
                    roomKey: this.roomKey,
                    //roundKey: this.selectorUser
                }
            );
            }
            });
          }
          // else {
            
            // }
          // }
        });
      }
    });
  }

  private dismissLoading(){
    if(this.loader != null)
      this.loader.dismiss();
  }
    
  private raffleSpy(){ 
     let spyRandNumber = Math.floor(Math.random() * this.usersModel.length );
    console.log("spy random number " + spyRandNumber);
    //  if(spyRandNumber >= this.usersModel.length)
    //   spyRandNumber = this.usersModel.length - 1;
     this.spyUser = this.usersModel[spyRandNumber].$key;
     //this.af.object(`/rooms/${this.roomKey}/spy`).set(this.spyUser);
     
     this.roomService.setSpy(this.spyUser);
  }

  private raffleSelector(){ 
    
    let spyRandNumber = Math.floor(Math.random() * this.usersModel.length);
    // if(spyRandNumber >= this.usersModel.length)
    //   spyRandNumber = this.usersModel.length - 1;
    console.log("selector random number " + spyRandNumber);

    this.selectorUser = this.usersModel[spyRandNumber].displayName;
    this.af.object(`/rooms/${this.roomKey}/selector`).set(this.selectorUser);
  }
  
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  startGame() {
      this.presentLoading();
      this.roomService.updateUsersInRoom(this.roomKey);

      // raffle spy and category selector  
      this.raffleSelector(); 
      this.raffleSpy();
      console.log("new round");
      let round: RoundModel = {
        categoryName: "",
        selectorKey: this.selectorUser,
        spyKey: this.spyUser,
        roomKey: this.roomKey,
        state: "init",
        secret: 0
      }

      let roundKey = this.af.list(`rounds/`).push(round).key;
console.log("new round key " + roundKey);
      // Add new room to the db
       this.af.object(`rooms/${this.roomKey}/isStarted`).set(true);
       this.af.object(`rooms/${this.roomKey}/usersCount`).set(this.usersCount);
  
  }

  private getUserPoints(user: UserModel) {
    this.af.object(`/rooms/${this.roomKey}/users/${user.$key}`).subscribe(t=> {
      console.log("return value " + t.$value);
      return t.$value;
    });
  }

  
}
