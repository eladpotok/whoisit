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
  spy: string;
  currentUser: UserModel;
  isSpyWon: Boolean;
  users: UserModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private auth: AuthService, private roomsSerivce: RoomsService) {
    
    this.users = roomsSerivce.getUsersFromRoom();
    this.currentUser = auth.currentUser;
    this.roomKey = this.navParams.get('roomKey');
    this.roundKey = this.navParams.get('roundKey');
    console.log("the room key " + this.roomKey);
    this.af.object(`rooms/${this.roomKey}/spy`).subscribe(t=> {
      this.spy = t.$value;
      console.log("the spy " + this.spy);
    });
    
  }

  private checkWinner() {
    let maxVotes =0;
    let userMax;
    this.af.list(`games/${this.roundKey}/votes`, { preserveSnapshot: true}).subscribe(
      t=> {
        t.forEach(user => {
            if(user.val().$value > maxVotes){
                maxVotes = user.val().$value;
                userMax = user.val().key;
            }
        });
      }
    );

    if(userMax == this.spy)
      this.isSpyWon = false;
    else
      this.isSpyWon = true;
    
  }

  public getVotes(user: UserModel) : Number {
    this.af.object(`rounds/${this.roundKey}/votes/${user.$key}`).subscribe( t=> {
      return t.$value;
    });
    return 0;
  }

}
