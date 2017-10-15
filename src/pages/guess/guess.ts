import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CategoryModel, MemberModel } from '../../Models/category.model';
import { AuthService } from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';


@IonicPage()
@Component({
  selector: 'page-guess',
  templateUrl: 'guess.html',
})
export class GuessPage {
  secret: number;
  members: MemberModel[] = [];
  roundKey: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
  public auth: AuthService, public roomsService: RoomsService) {
    
    let categoryKey = navParams.get('category');
    this.secret = navParams.get('secret');
    this.roundKey = navParams.get('roundKey');
    this.af.list(`categories/${categoryKey}/members`).subscribe( t=>{
      this.members = t;
    });
  }

  choose(category: MemberModel) {
    // check if the spy selects the right secret
    console.log("this.secret  " + this.secret.toString());
    console.log("category.$key " + category.$key);
    if(this.secret.toString() == category.$key) {
      this.auth.currentUser.pointsInRoom +=3;
      this.af.object(`/rooms/${this.roomsService.currentRoom.$key}/users/${this.auth.currentUser.$key}`).set(this.auth.currentUser.pointsInRoom);
      console.log("round key of guess " + this.roundKey);
      this.af.object(`/rounds/${this.roundKey}/spyGuessRight`).set(true);
    }

    // raise that the spy guess 
    this.af.object(`/rounds/${this.roundKey}/isSpyGuess`).set(true);
    
    this.navCtrl.push('ScorePage', {
      roomKey: this.roomsService.currentRoom.$key,
      roundKey: this.roundKey
    });
  }

}
