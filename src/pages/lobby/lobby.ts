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
import { AlertController } from 'ionic-angular';
import { MessagesService } from '../../services/messages.service';
import { HomePage } from '../home/home'

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
  loadUserSubscriber: any;
  roomClosedSubscriber: any;
  selectorUserKey: string; 
  spyUser: string;
  roomName: string;
  usersInRoomKey: string;
  usersModel: UserModel[] = [];
  usersCount: number;
  loader: any;
  entryCode: string;
  currentRound: string;
  isOwnerLeft: boolean;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public af: AngularFireDatabase, private authService: AuthService,
              private roomService: RoomsService, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public msgService: MessagesService) {
    
    console.log("ctor of lobby");
    // Get thr paramters from the navigation controller
    this.roomKey = this.navParams.get('roomKey');

    // load the users from the room
    this.loadUsers();
    
    // find the room by the given entry code
    this.findRoom();

    
  }

  ionViewDidLoad() {
    
    this.roomClosedSubscriber = this.af.object(`rooms/${this.roomKey}/isClosed`).subscribe( t=> {
      console.log("check1");
      this.isOwnerLeft = t.$value;
      if(t.$value && !this.isOwner) {
        this.msgService.showMsg("Oh No!", "The owner of the room just left the room. You are redirected back to the home page")
        this.leaveRoom();
      }
    });
  }

  ionViewWillLeave() {
    console.log("leave the lobby page");
    if(this.roomService.isLeftRoom)
      this.leaveRoom();
  }

  ionViewDidEnter() {
    console.log("enter back");
    this.prepareRoom()
  }

  private prepareRoom() {
    let subscription = this.af.list(`rounds/${this.roomKey}/`).subscribe(t=>{
      t.forEach(r=>{
        console.log("in foreach");
        if(r != null && r.roomKey == this.roomKey && r.state != "done"){
          this.currentRound = r.$key;
          subscription.unsubscribe();
          this.af.object(`rounds/${this.roomKey}/${this.currentRound}/isCategorySelected`).subscribe(category => {
            console.log("category selected - changed");
            if(category.$value){
              this.dismissLoading();
              this.navCtrl.push('GamePage', {roundKey: this.currentRound});
            }
          });
          this.af.object(`rounds/${this.roomKey}/${this.currentRound}/selectorKey`).subscribe(selector => {
            if(selector.$value == this.authService.currentUser.$key){
              console.log("selector key - changed");
              this.navCtrl.push('ChooseCategoryPage', {roundKey: this.currentRound , roomKey: this.roomKey});
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
      let subscription = this.af.object(`/rooms/${this.roomKey}`).subscribe( t=> {
        this.roomName = t.roomName;
        if(t.owner == this.authService.currentUser.displayName)
            this.isOwner = true;
        else {
            this.roomService.updateUsersInRoom(this.roomKey);      
        }

        this.entryCode = t.entryCode;
        if(subscription != null)
          subscription.unsubscribe();
    })
  }

  private loadUsers() {
    
      // get the users in the current room
      this.loadUserSubscriber = this.af.list(`rooms/${this.roomKey}/users`).subscribe( snapshots => {
        console.log("check2");
        if(this.roomService.isLeftRoom)
          return;
          console.log("get here " + this.roomService.isLeftRoom);
        if(!this.isOwnerLeft)
          this.checkUserLeft(snapshots.length);

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

  private checkUserLeft(newUserCount: number) {
    
    if(this.usersCount > newUserCount) {
      console.log("someone left the room")
      this.msgService.showToast("One of the players left the room");
      if(this.isOwner){
        this.af.object(`rooms/${this.roomKey}/usersCount`).set(newUserCount);
        this.af.object(`rooms/${this.roomKey}/isStarted`).set(false);
        this.af.object(`rounds/${this.roomKey}/${this.currentRound}/state`).set("done");
      }
      console.log("jump");
      if(this.navCtrl.getActive().name != "LobbyPage")
        this.navCtrl.popTo(this.navCtrl.getByIndex(1));      
    }
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
      
      if(this.usersCount < 4 && !this.authService.IsDebug) {
        this.msgService.showMsg("Sorry", "The round can be executed only for 4 players and above.");
        return;
      }
      console.log("start game 1 ");
      this.roomService.updateUsersInRoom(this.roomKey);
      console.log("start game 2 ");
      // raffle spy and category selector  
      this.raffleSelector(); 
      console.log("start game 3 ");
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
    let alert = this.alertCtrl.create({
      title: 'Attention?',
      message: 'Are you sure that you want to leave the room?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Leave',
          handler: () => {
            this.leaveRoom();
          }
        }
      ]
    });
    alert.present();
  }

  private leaveRoom() {
      
      if(this.loadUserSubscriber != null)
        this.loadUserSubscriber.unsubscribe();
      this.roomClosedSubscriber.unsubscribe();

      if(this.isOwner) {
          console.log("i am owner");
          // alert that the room is closed
          this.af.object(`rooms/${this.roomKey}/isClosed`).set(true);
      }
      this.af.list(`rooms/${this.roomKey}/users/`).remove(this.authService.currentUser.$key);
      
      console.log("popToRoot")
      this.navCtrl.popToRoot();
  }

  public goSettings() {
    this.navCtrl.push('SettingsPage', {roomKey: this.roomKey});
  }

}
