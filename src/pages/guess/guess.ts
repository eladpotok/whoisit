import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MemberModel } from '../../Models/category.model';
import { AuthService } from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-guess',
  templateUrl: 'guess.html',
})
export class GuessPage {
  secret: number;
  members: MemberModel[] = [];
  roundKey: string;
  intervalId: any;
  second: number = 15;
  startTime;
  dateTime: Date = new Date();
  secLabel: string = "0";

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
  public auth: AuthService, public roomsService: RoomsService, public toastCtrl: ToastController) {
    
    this.showTimer();

    this.intervalId = setInterval(()=> {
      this.second--;
      this.secLabel = "" + this.second;

       if(this.second == 0) {
         this.timeIsOff();
       }
    }, 1000); 

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

  showTimer() {
    let toast = this.toastCtrl.create({
      message: 'You got 10 seconds to guess!',
      duration: 1000,
      position: "bottom"
    });

    toast.present(toast);
  }

  private timeIsOff() {
    this.af.object(`/rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/spyState`).set("lose");
  }

  ionViewWillLeave() {
    clearInterval(this.intervalId);
  }

  choose(category: MemberModel) {
    clearInterval(this.intervalId);

    if(this.secret.toString() == category.$key) {
      this.af.object(`/rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/spyState`).set("semi-win");
    }
    else {
      this.af.object(`/rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/spyState`).set("lose");
    }
  }

  swipeEvent(e, category: MemberModel) {
    this.choose(category);
  }
}
