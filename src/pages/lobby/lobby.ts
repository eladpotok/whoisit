import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../Models/user.model';
import { RoomModel } from '../../Models/room.model';
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
  selectorUserKey: string; 
  spyUser: string;
  roomName: string;
  usersInRoomKey: string;
  usersModel: UserModel[] = [];
  usersCount: number;
  loader: any;
  entryCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public af: AngularFireDatabase, private authService: AuthService,
              private roomService: RoomsService, public loadingCtrl: LoadingController) {
                
    console.log("enter to lobby ctor");

    // Get thr paramters from the navigation controller
    this.roomKey = this.navParams.get('roomKey');

    // load the users from the room
    this.loadUsers();
    
    // find the room by the given entry code
    this.findRoom();


    let subscription = this.af.list(`rounds/${this.roomKey}/`).subscribe(t=>{
      t.forEach(r=>{
        if(r != null && r.roomKey == this.roomKey && r.state != "done"){
          let roundKey = r.$key;
          subscription.unsubscribe();
          this.af.object(`rounds/${this.roomKey}/${roundKey}/isCategorySelected`).subscribe(category => {
            if(category.$value){
              this.dismissLoading();
              this.navCtrl.push('GamePage', {roundKey: roundKey});
            }
          });
          this.af.object(`rounds/${this.roomKey}/${roundKey}/selectorKey`).subscribe(selector => {
            if(selector.$value == this.authService.currentUser.$key){
              this.navCtrl.push('ChooseCategoryPage', {roundKey: roundKey});
            }
            else if(selector.$value != null) {
              this.presentLoading();
            }
          });
        }
      });
    });
  }

  private findRoom(){
      // Get the current room
      this.af.object(`/rooms/${this.roomKey}`).subscribe( t=> {
      this.roomName = t.roomName;
      if(t.owner == this.authService.currentUser.displayName)
          this.isOwner = true;
      else {
          this.roomService.updateUsersInRoom(this.roomKey);      
      }

      this.entryCode = t.entryCode;
    })
  }

  private loadUsers() {
      // get the users in the current room
      this.af.list(`rooms/${this.roomKey}/users`).subscribe( snapshots => {
        this.usersModel = [];
        this.usersCount = snapshots.length;
        snapshots.forEach( snapshot=> {
          let userId = snapshot.$key;
          let points = snapshot.$value;
          
          this.af.object(`users/${userId}`).subscribe( t=> {
            t.pointsInRoom = points;
            this.usersModel.push(t);
          });
        });
      });
  }
    
  private raffleSpy(){ 
     let spyRandNumber = Math.floor(Math.random() * this.usersModel.length );
     this.spyUser = this.usersModel[spyRandNumber].$key;
     
     this.roomService.setSpy(this.spyUser);
  }

  private raffleSelector(){ 
    
    let spyRandNumber = Math.floor(Math.random() * this.usersModel.length);

    this.selectorUserKey = this.usersModel[spyRandNumber].$key;
  }
  
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  dismissLoading() {
    if(this.loader != null)
      this.loader.dismiss();
  }

  startGame() {
      
      this.roomService.updateUsersInRoom(this.roomKey);

      // raffle spy and category selector  
      this.raffleSelector(); 
      this.raffleSpy();

      let round: RoundModel = {
        categoryKey: "",
        selectorKey: this.selectorUserKey,
        spyKey: this.spyUser,
        roomKey: this.roomKey,
        secret: 0
      }

      this.af.list(`rounds/${this.roomKey}/`).push(round);

      // Add new room to the db
      this.af.object(`rooms/${this.roomKey}/isStarted`).set(true);
      this.af.object(`rooms/${this.roomKey}/usersCount`).set(this.usersCount);
  }

  public exit() {
    this.af.list(`rooms/${this.roomKey}/users/`).remove(this.authService.currentUser.$key);
    this.navCtrl.push('HomePage');
  }
  
}
