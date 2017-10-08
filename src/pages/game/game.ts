import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { RoomModel } from '../../Models/room.model';
import { CardModel } from '../../Models/card.model';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  roomKey: string;
  roomModel: RoomModel;
  titleGame: string;
  photoImage: string;
  photoTitle: string;
  cardList: CardModel[];
  isGameStarted: string;
  selectorUser: string;
  imageKey: string;
  isSpy: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase,
              private authService: AuthService) {

      this.roomKey = this.navParams.get('roomKey');
      this.selectorUser = this.navParams.get('selectorUser');
      this.af.object(`rooms/${this.roomKey}/categoryName`).subscribe(
        t=> {
          this.titleGame = t.$value;
        }
      )
     
      this.drawCard();
      
  }

  private drawCard() {
     this.af.object(`rooms/${this.roomKey}/spy`).subscribe( spy => {
        if(spy.$value == this.authService.currentUser.$key) {
            this.drawSpy();
        }
        else {
          console.log("enter to random card");
            this.drawRandomCard();
        }
    });
  }

  private drawRandomCard() {
      this.af.list('/categories', { preserveSnapshot: true}).subscribe(snapshots=>{
          snapshots.forEach(snapshot => {
              if(snapshot.val().category == this.titleGame) {
                if(!snapshot.val().isTaken) {
                  this.photoImage = snapshot.val().link;
                  this.photoTitle = snapshot.val().title;
                  // Take the key of the image so we can sign it as taken
                  this.imageKey = snapshot.key;
                  return;
                }
              }
          });
      });

      // set the image as taken
      this.af.object(`/categories/${this.imageKey}/isTaken`).set(true);
  }
  
  private drawSpy() {
 
    this.photoImage = "assets/spy.png";
    this.photoTitle = "Spy";
    this.isSpy = true;
  }

  LeaveGame() {
    //this.af.object(`categories/${this.imageKey}/isTaken`).set(false);
    this.navCtrl.push('EndGamePage', {
      roomKey: this.roomKey
    });
  }

}
