import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
import { RoundModel } from '../../Models/round.model';

@IonicPage()
@Component({
  selector: 'page-end-game',
  templateUrl: 'end-game.html',
})
export class EndGamePage {

  usersModel: UserModel[] = [];
  roomKey: string;
  roundKey: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase) {

    this.roomKey = this.navParams.get('roomKey');
    this.roundKey = this.navParams.get('roundKey');

    if(this.roundKey != null) {
          this.af.object(`rounds/${this.roundKey}/votesCount`).set(0);
          this.af.object(`rounds/${this.roundKey}/votes/dummy`).set(true);
    } 
    else {
      this.af.list(`rounds/`).subscribe( t=> {
        t.forEach( room => {
          if(room.val().roomKey == this.roomKey){
            this.roomKey = room.val().key;
            return;
          }
        });
      });
    }

    // get the users in the current room
    af.list(`rooms/${this.roomKey}/users`).subscribe( snapshots => {
      this.usersModel = [];
      
      snapshots.forEach( snapshot=> {
        let userId = snapshot.$key;
        af.object(`users/${userId}`).subscribe( t=> {
          this.usersModel.push(t);
        });
      });
    });

    // wait till all users will vote
    af.object(`rounds/${this.roundKey}/isAllVoted`).subscribe( t=> {
        if(t.$value) {
          this.navCtrl.push('ScorePage', {
            roundKey: this.roundKey,
            roomKey: this.roomKey
          });
        }
    });
  }


  selectUser(user: UserModel) {
    let counter = 0;  
    let subscribtion = this.af.object(`/rounds/${this.roundKey}/votes/${user.$key}`).subscribe(user => {
      counter = user.$value;
      subscribtion.unsubscribe();
      counter++;
      this.af.object(`/rounds/${this.roundKey}/votes/${user.$key}`).set(counter);
    });

    //this.navCtrl.push('cat');
  }
}
