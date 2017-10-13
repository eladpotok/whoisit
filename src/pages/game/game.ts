import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { RoomModel } from '../../Models/room.model';
import { CardModel } from '../../Models/card.model';
import { AuthService } from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import { Observable } from 'rxjs/Observable';
import { RoundModel} from '../../Models/round.model';
import {CategoryModel } from '../../Models/category.model';
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
  titleGame: string;
  photoImage: string;
  photoTitle: string;
  isSpy: Boolean;
  roundKey: string;
  category: CategoryModel

  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase,
              private authService: AuthService, private roomsService: RoomsService) {
      
      this.roomKey = this.navParams.get('roomKey');
      console.log("1");
      let subscription = this.af.list(`rounds/`).subscribe(round=> {
          round.forEach( r => {
              if(r.roomKey == this.roomKey) {
                this.roundKey = r.$key;
                this.roomsService.setSpy(r.spyKey);
                console.log("2");
                    this.af.object(`/rounds/${this.roundKey}/categoryName`).subscribe(
                        t=> {
                          console.log("3");
                            this.af.object(`categories/${t.$value}/`).subscribe(cat=> {
                              console.log("ctor game " + t.$value);
                              this.category = cat;
                              subscription.unsubscribe();
                              this.drawCard();
                            });
                            
                    }
                  )
      
        
              }
          });
      });

     
  }

  private drawCard() {
      if(this.roomsService.getSpy() == this.authService.currentUser.$key) {
            this.drawSpy();
      }
      else {
          this.drawRandomCard();
      }
  }

  private drawRandomCard() {
  
      this.titleGame = this.category.title;
      this.af.object(`rounds/${this.roundKey}/secret`).subscribe( t=> {
        this.photoImage = 'assets/' + this.titleGame + "/" + t.$value + ".png"; 
      });

      

      // set the image as taken
      //this.af.object(`/categories/${this.imageKey}/isTaken`).set(true);
  }
  
  private drawSpy() {
 
    this.photoImage = "assets/spy2.png";
    this.photoTitle = "Spy";
    this.titleGame = this.category.title;
    this.isSpy = true;
  }

  LeaveGame() {
     
      this.navCtrl.push('EndGamePage', {
      roomKey: this.roomKey,
      roundKey: this.roundKey

    });
    //this.af.object(`categories/${this.imageKey}/isTaken`).set(false);
    
  }

}
