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

  winUsers: UserModel[] =[];
  loseUsers: UserModel[] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private auth: AuthService, private roomsSerivce: RoomsService) {
    
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
      console.log("this is t " + this.isSpyWon);
      this.calculatePoints(this.isSpyWon);
    });

    // get the spy user
    this.af.object(`users/${this.roomsSerivce.getSpy()}/`).subscribe(t=> {
      this.spy = t;
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
    this.navCtrl.push('LobbyPage', {
      roomKey: this.roomKey
    });
  }

  getNewPointsForLoser() : number {
    if(!this.isSpyWon && this.spy.$key != this.auth.currentUser.$key)
      return 2;

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