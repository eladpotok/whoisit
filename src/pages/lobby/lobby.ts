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
  selectorUserKey: string; 
  spyUser: string;
  roomName: string;
  usersInRoomKey: string;
  loader: any;
  entryCode: string;
  currentRound: string;
  enterToSettings: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public af: AngularFireDatabase, private authService: AuthService,
              private roomService: RoomsService, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public msgService: MessagesService) {
    
    console.log("ctor of lobby");
    // Get thr paramters from the navigation controller
    this.roomKey = this.navParams.get('roomKey');

   // find the room by the given entry code
   this.findRoom();

    // load the users from the room
    this.loadUsers();

    // check if the room is closed by the owner
    this.roomService.checkRoomClosed(this.isOwner, () => { this.navCtrl.popToRoot(); });
  }

  ionViewDidEnter() {
    // this workaround helps when we leave the page only for settings page
    // and do not want the room to prepare it again.
    if(!this.enterToSettings)
      this.prepareRoom();
    this.enterToSettings = false;
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
      this.roomService.loadUsers(this.isOwner, this.currentRound, this.roomKey,
      () => {
        if(this.navCtrl.getActive().name != "LobbyPage")
          this.navCtrl.popTo(this.navCtrl.getByIndex(1));
      });
  }
    
  private raffleSpy(){ 
     let spyRandNumber = Math.floor(Math.random() * this.roomService.usersModel.length );
     this.spyUser = this.roomService.usersModel[spyRandNumber].$key;
     
     this.roomService.setSpy(this.spyUser);
  }

  private raffleSelector(){ 
    let spyRandNumber = Math.floor(Math.random() * this.roomService.usersModel.length);

    this.selectorUserKey = this.roomService.usersModel[spyRandNumber].$key;
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
      
      if(this.roomService.usersCount < 4 && !this.authService.IsDebug) {
        this.msgService.showMsg("Sorry", "The round can be executed only for 4 players and above.");
        return;
      }
      console.log("start game - room key" + this.roomKey);
      this.roomService.updateUsersInRoom(this.roomKey);
      // raffle spy and category selector  
      this.raffleSelector(); 
      this.raffleSpy();

      let round: RoundModel = {
        categoryKey: "",
        selectorKey: this.selectorUserKey,
        spyKey: this.spyUser,
        roomKey: this.roomKey,
        secret: 0,
        votesCount: 0
      }

      this.af.list(`rounds/${this.roomKey}/`).push(round);

      // Add new room to the db
      this.af.object(`rooms/${this.roomKey}/isStarted`).set(true);
      this.af.object(`rooms/${this.roomKey}/usersCount`).set(this.roomService.usersCount);
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
    console.log("leave room from lobby");
    this.roomService.leaveRoom(this.isOwner);
    this.navCtrl.popToRoot();
  }

  public goSettings() {
    this.enterToSettings = true;
    this.navCtrl.push('SettingsPage', {roomKey: this.roomKey});
  }

}
