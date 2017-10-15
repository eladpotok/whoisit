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
    
    this.roundKey = this.navParams.get('roundKey');

    this.af.object(`rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/categoryKey`).subscribe(catKey => {
      this.af.list(`categories/${catKey.$value}/members`).subscribe(mem=>{
        this.members = mem;
      });
    });

    this.af.object(`rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/secret`).subscribe(secret => {
      this.secret = secret.$value;
    });
  }

  choose(category: MemberModel) {
    if(this.secret.toString() == category.$key) {
      this.af.object(`/rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/spyState`).set("semi-win");
    }
    else {
      this.af.object(`/rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/spyState`).set("lose");
    }
  }
}
