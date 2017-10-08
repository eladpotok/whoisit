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

@IonicPage()
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {

  roomKey: string;
  userItems: Observable<UserModel[]>;
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

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
              public af: AngularFireDatabase, private alertCtrl: AlertController, private authService: AuthService,
              private roomService: RoomsService) {


    // Get thr paramters from the navigation controller
    this.roomKey = this.navParams.get('roomKey');

    this.userItems = af.list(`rooms/${this.roomKey}/users`);

    // get the users in the current room
    af.list(`rooms/${this.roomKey}/users`).subscribe( snapshots => {
      this.usersModel = [];
      this.usersCount = snapshots.length;
      snapshots.forEach( snapshot=> {
        let userId = snapshot.$key;
        af.object(`users/${userId}`).subscribe( t=> {
          this.usersModel.push(t);
        });
      });
    });

    // Get the current room
    af.object(`/rooms/${this.roomKey}`).subscribe( t=> {
      this.roomName = t.roomName;
      if(t.owner == authService.currentUser.displayName)
          this.isOwner = true;

      this.entryCode = t.entryCode;
    })

    af.object(`rooms/${this.roomKey}/isStarted`).subscribe( t=> {
      console.log("enter");
      if(t.$value) {

          this.af.object(`rooms/${this.roomKey}/selector`).subscribe(  selector => {
            if(selector.$value == authService.currentUser.displayName) {
              this.navCtrl.push('ChooseCategoryPage', {
                roomKey: this.roomKey,
                spy: this.spyUser
              });
            }
            });
          }
          else {
            af.object(`rooms/${this.roomKey}/isCategorySelected`).subscribe(catSelected => {
              if(catSelected.$value) {
                  // go to the loading game...
                  this.navCtrl.push('GamePage', {
                    roomKey: this.roomKey,
                    selectorUser: this.selectorUser
              }
            );
          }
        });
      }
    });
  }
    
  private raffleSpy(){ 
     let spyRandNumber = Math.floor(Math.random() * (this.usersModel.length - 1) );

     if(spyRandNumber >= this.usersModel.length)
      spyRandNumber = this.usersModel.length - 1;
     this.spyUser = this.usersModel[spyRandNumber].$key;
     this.af.object(`/rooms/${this.roomKey}/spy`).set(this.spyUser);
  }

  private raffleSelector(){ 
    let spyRandNumber = Math.floor(Math.random() * (this.usersModel.length - 1));
    if(spyRandNumber >= this.usersModel.length)
      spyRandNumber = this.usersModel.length - 1;

    this.selectorUser = this.usersModel[spyRandNumber].displayName;
    this.af.object(`/rooms/${this.roomKey}/selector`).set(this.selectorUser);
  }

  startGame() {
 
      this.roomService.updateUsersInRoom(this.roomKey);

      // raffle spy and category selector  
      this.raffleSelector(); 
      this.raffleSpy();
     

      // Add new room to the db
       this.af.object(`rooms/${this.roomKey}/isStarted`).set(true);
       this.af.object(`rooms/${this.roomKey}/usersCount`).set(this.usersCount);
  
  }

  
}
