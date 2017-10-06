import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
import { StatModel } from '../../Models/stat.model';

@IonicPage()
@Component({
  selector: 'page-end-game',
  templateUrl: 'end-game.html',
})
export class EndGamePage {

  usersModel: UserModel[] = [];
  roomKey: string;
  statKey: string
  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase) {

    this.roomKey = this.navParams.get('roomKey');
    
    // crearing and adding new stat model to db
    let statModel: StatModel = {
      roomKey: this.roomKey
    }

    this.statKey = this.af.list(`/games/`).push(statModel).key;
    this.af.object(`games/${this.statKey}/votesCount`).set(0);

    this.af.object(`games/${this.statKey}/votes/dummy`).set(true);

    // get the users in the current room
    af.list(`rooms/${this.roomKey}/users`).subscribe( snapshots => {
      this.usersModel = [];
      
      snapshots.forEach( snapshot=> {
        let userId = snapshot.$key;
        af.object(`users/${userId}`).subscribe( t=> {
          this.usersModel.push(t);
          //this.af.object(`games/${this.statKey}/votes/${userId}`).set(0);
        });
      });
    });

    // wait till all users will vote
    af.object(`games/${this.statKey}/isAllVoted`).subscribe( t=> {
        if(t.$value) {
          this.navCtrl.push('ScorePage', {
            statId: this.statKey,
            roomKey: this.roomKey
          });
        }
    });
  }


  selectUser(user: UserModel) {
    let counter = 0;  
    let subscribtion = this.af.object(`/games/${this.statKey}/votes/${user.$key}`).subscribe(user => {
      counter = user.$value;
      subscribtion.unsubscribe();
      counter++;
      this.af.object(`/games/${this.statKey}/votes/${user.$key}`).set(counter);
    });

    //this.navCtrl.push('cat');
  }
}
