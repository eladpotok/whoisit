import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
import { AuthService} from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {

  //usersLoaded: Boolean;
  roomKey: string;
  roundKey: string;
  currentUser: UserModel;
  isSpyWon: Boolean;
  users: UserModel[];
  spy: UserModel;
  spyGuessRight: boolean;
  winUsers: UserModel[] =[];
  loseUsers: UserModel[] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private auth: AuthService, private roomsSerivce: RoomsService) {
    console.log("enter to ctor of score");
    this.users = roomsSerivce.getNonSpyPlayers();
    this.currentUser = auth.currentUser;
    this.roomKey = this.navParams.get('roomKey');
    this.roundKey = this.navParams.get('roundKey');
    
    this.af.list(`rounds/${this.roundKey}/wins`).subscribe(t=>{
      t.forEach( user => {
        let userKey = user.$value;
          this.winUsers.push(this.roomsSerivce.getUser(userKey));
      });
    });
    this.af.list(`rounds/${this.roundKey}/loses`).subscribe(t=>{
      t.forEach( user => {
        let userKey = user.$value;
        
          this.loseUsers.push(this.roomsSerivce.getUser(userKey));
      });
    });

    this.af.object(`rounds/${this.roundKey}/isSpyWon`).subscribe( t=> {
      this.isSpyWon = t.$value;
      if(t.$value != null)
        this.calculatePoints(this.isSpyWon);
    });

    // get the spy user
    this.af.object(`users/${this.roomsSerivce.getSpy()}/`).subscribe(t=> {
      this.spy = t;
    });

    this.af.object(`rounds/${this.roundKey}/spyGuessRight`).subscribe( t=> {
      if(t.$value){
        this.spyGuessRight = true;
      }
    });
  }

  calculatePoints(isSpyWon: Boolean) {
    if(isSpyWon) {
        if(this.roomsSerivce.getSpy() == this.auth.currentUser.$key){
            this.auth.currentUser.pointsInRoom += 5;
        } 
    }
    else {
      if(this.roomsSerivce.getSpy() != this.auth.currentUser.$key){
            this.auth.currentUser.pointsInRoom += 3;
        }
    }
    this.af.object(`/rooms/${this.roomKey}/users/${this.auth.currentUser.$key}`).set(this.auth.currentUser.pointsInRoom);
  }

  public getVotes(user: UserModel) : Number {
    this.af.object(`rounds/${this.roundKey}/votes/${user.$key}`).subscribe( t=> {
      return t.$value;
    });
      return 0;
  }

  public backToLobby() {
    
    // this.navCtrl.push('LobbyPage', {
    //   roomKey: this.roomKey
    // });
    //this.af.object(`rooms/${this.roomKey}/isCategorySelected`).set(false);
    //this.af.object(`rooms/${this.roomKey}/selector`).set("");
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    console.log("pop to");
  }

  getNewPointsForLosers() : number {

    if(!this.isSpyWon && this.spy.$key != this.auth.currentUser.$key)
      return 2;

    return 0;
  }

  getPointsOfSpy() : number {
    if(this.isSpyWon){
      return 5;
    }
    else{
      if(this.spyGuessRight){
        return 3;
      }
    }
    return 0;
  }

  getNewPointsForWinners() : number {

    let points = 0;
    if(!this.isSpyWon)
      return 5;

    return 2;
  }
  

}

//rules
// Spy Wins:
// spy earn 5 points.
// players who voted for spy: 2 points.

// Spy Loses:
// players who voted for spy: 2 points
// all players execpt spy earn 3 points
// If spy guess right he earns 3 points.