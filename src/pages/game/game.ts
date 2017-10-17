import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import {CategoryModel } from '../../Models/category.model';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  roomKey: string;
  photoImage: string;
  subjectTitle: string;
  categoryTitle: string;
  isSpy: Boolean;
  roundKey: string;
  second: number = 0;
  min: number = 8;
  id: any;
  lastSeconds: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase,
              private authService: AuthService, private roomsService: RoomsService, private cd : ChangeDetectorRef) {

    this.roundKey = this.navParams.get('roundKey');
    
    let subscription =this.af.object(`rounds/${roomsService.currentRoom.$key}/${this.roundKey}`).subscribe( round => {
      if(round.spyKey == this.authService.currentUser.$key){
        this.drawSpy();
        subscription.unsubscribe();
      }
      else {
        this.drawRandomCard(round.secret, round.categoryKey);
        subscription.unsubscribe();
      }

      // set the spy so we could know him in the future
      this.roomsService.setSpy(round.spyKey);
    });

    this.id = setInterval(()=> {
       if(this.second == 0){
         this.second = 59;
         this.min--;
       }
       else {
         this.second--;
       }
       if(this.second == 30 && this.min == 0)
        this.lastSeconds = true;
       if(this.second == 0 && this.min == 0) {
         clearInterval(this.id);
         this.LeaveGame();
       }
       cd.markForCheck();
    }, 1000); 
  }

  private drawRandomCard(subject: number, categoryKey: string) {
    this.af.object(`categories/${categoryKey}/`).subscribe( category =>{
      let catModel: CategoryModel = category;
      this.categoryTitle = catModel.title;
      this.photoImage = catModel.members[subject].url; 
      this.subjectTitle = catModel.members[subject].title; 
    });
  }
  
  private drawSpy() {
    this.photoImage = "assets/spy2.png";
    this.subjectTitle = "Spy";
    this.isSpy = true;
  }

  public LeaveGame() {
      this.navCtrl.push('EndGamePage', {
      roundKey: this.roundKey
    });
  }

}
