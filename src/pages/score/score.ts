import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
import { AuthService} from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import { SettingsModel } from '../../Models/settings.model';


@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {

  settings: SettingsModel;
  roundKey: string;
  currentUser: UserModel;
  users: UserModel[];
  spy: UserModel;
  winUsers: UserModel[] =[];
  loseUsers: UserModel[] =[];
  spyState: string;
  isSpyWon: boolean;
  isGreatGuess: boolean;
  intervalId: any;
  votes: { [id: string] : string; } = {};
  roundsInterval: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private auth: AuthService, private roomsSerivce: RoomsService) {
    
    this.intervalId = setInterval(()=> {
      this.backToLobby();
    }, 6000);

    this.users = roomsSerivce.getNonSpyPlayers();
    this.currentUser = this.auth.currentUser;

    this.roundKey = this.navParams.get('roundKey');
    this.spyState = this.navParams.get('spyState');
    
    this.af.object(`settings/${roomsSerivce.currentRoom.settingsKey}`).subscribe(t=>{
      this.roundsInterval = t.roundsInterval;
      console.log("rounds interval:" + this.roundsInterval );
    });

    this.af.list(`rounds/${roomsSerivce.currentRoom.$key}/${this.roundKey}/wins`).subscribe(t=>{
      t.forEach( user => {
        let userKey = user.$value;
          this.winUsers.push(this.roomsSerivce.getUser(userKey));
      });
    });
    this.af.list(`rounds/${roomsSerivce.currentRoom.$key}/${this.roundKey}/loses`).subscribe(t=>{
      t.forEach( user => {
        let userKey = user.$value;
        
          this.loseUsers.push(this.roomsSerivce.getUser(userKey));
      });
    });

    // get the spy user
    this.af.object(`users/${this.roomsSerivce.getSpy()}/`).subscribe(t=> {
      this.spy = t;
    });

    this.checkVotesStatus();
  }

  private checkVotesStatus() {
    this.af.list(`/rounds/${this.roomsSerivce.currentRoom.$key}/${this.roundKey}/votesStatus`).subscribe(t=>{
      t.forEach(vote=>{
        if(vote.$key != null && vote.$value != null) {
          console.log("the key is " + vote.$key + " and the value is = " + vote.$value);
          this.votes[vote.$key] = vote.$value;
        }
      });
    });
  }

  ionViewWillLeave() {
    clearInterval(this.intervalId);
  }

  public backToLobby() {
    
    
    // set the round as done
    this.af.object(`rounds/${this.roomsSerivce.currentRoom.$key}/${this.roundKey}/state`).set("done");

    // this.navCtrl.push('LobbyPage', {
    //   roomKey: this.roomsSerivce.currentRoom.$key
    // });

    //this.af.object(`rooms/${this.roomKey}/isCategorySelected`).set(false);
    //this.af.object(`rooms/${this.roomKey}/selector`).set("");
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    // console.log("pop to");
  }

  getNewPointsForLosers() : number {
    if(this.spyState == "lose") {
      return 3;
    }
    return 0;
  }

  getPointsOfSpy() : number {
    if(this.spyState == "win") {
      this.isSpyWon = true;
      return 5;
    }
    if(this.spyState == "semi-win"){
      this.isSpyWon = true;
      this.isGreatGuess = true;
      return 3;
    }
    return 0;
  }

  getNewPointsForWinners() : number {
    return this.getNewPointsForLosers() + 1;
  }

  public votesFor(user: UserModel) : string {
    return this.votes[user.displayName];
  }
}

//rules
// Spy Wins:
// spy earn 5 points.
// players who voted for spy: 1 points.

// Spy Loses:
// players who voted for spy: 1 points
// all players execpt spy earn 3 points
// If spy guess right he earns 3 points.