import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';




@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {

  roomKey: string;
  statKey: string;
  spy: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
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

}
