import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
import { AuthService} from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {

  roomKey: string;
  statKey: string;
  spy: string;
  currentUser: UserModel;
  isSpyWon: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private auth: AuthService) {
    
    
    this.currentUser = auth.currentUser;
    this.roomKey = this.navParams.get('roomKey');
    this.statKey = this.navParams.get('statId');
    console.log("the room key " + this.roomKey);
    this.af.object(`rooms/${this.roomKey}/spy`).subscribe(t=> {
      this.spy = t.$value;
      console.log("the spy " + this.spy);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScorePage');
  }

  private checkWinner() {
    let maxVotes =0;
    let userMax;
    this.af.list(`games/${this.statKey}/votes`, { preserveSnapshot: true}).subscribe(
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
    
  }

}
