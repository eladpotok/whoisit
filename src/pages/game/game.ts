import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import {CategoryModel } from '../../Models/category.model';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { MessagesService } from '../../services/messages.service';
import 'rxjs/add/operator/map';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

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
  min: number;
  id: any;
  loader: any;
  lastSeconds: boolean;
  secLabel: string = "0";
  alert: any;
  startTime;
  currentTime;
  dateTime: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase,
              private authService: AuthService, private roomsService: RoomsService, private cd : ChangeDetectorRef,
              public platform: Platform, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public viewCtrl: ViewController, public msgService: MessagesService) {
    
    // save the start date 
    this.startTime = this.dateTime.getTime();

    this.roundKey = this.navParams.get('roundKey');
    
    let subscription =this.af.object(`rounds/${roomsService.currentRoom.$key}/${this.roundKey}`).subscribe( round => {
      if(round.spyKey == this.authService.currentUser.$key){
        this.drawSpy(round.categoryKey);
        subscription.unsubscribe();
      }
      else {
        this.drawRandomCard(round.secret, round.categoryKey);
        subscription.unsubscribe();
      }
      // set the spy so we could know him in the future
      this.roomsService.setSpy(round.spyKey);
    });

    this.af.object(`/settings/${roomsService.currentRoom.settingsKey}`).subscribe( set=> {
      //this.min = set.timeElapsed;
      this.startTime += set.timeElapsed * 60000;
    });

    this.id = setInterval(()=> {
      var date: Date = new Date();
      var currTime = this.startTime - date.getTime();
      this.second = new Date(currTime).getSeconds();
      this.min = new Date(currTime).getMinutes();

      if(this.second <= 9 && this.second >= 0) {
           this.secLabel = "0" + this.second;
         }
      else {
           this.secLabel = this.second.toString();
         }
       
      if(this.second == 30 && this.min == 0)
        this.lastSeconds = true;
       if((this.second == 0 && this.min == 0) || this.min < 0) {
         this.LeaveGame();
       }
       cd.markForCheck();
    }, 1000); 
  }

  ionViewWillLeave() {
    clearInterval(this.id);
  }

  private addPointsToSpy(spyState: string) {
    let points =0;
    switch(spyState) {
      case "win":
        points = 5;
        break;
      case "semi-win":
        points = 3;
        break;
    }

    this.authService.currentUser.pointsInRoom += points;
    this.af.object(`/rooms/${this.roomsService.currentRoom.$key}/users/${this.authService.currentUser.$key}`).set(this.authService.currentUser.pointsInRoom);
  }

  private drawRandomCard(subject: number, categoryKey: string) {
    this.af.object(`categories/${categoryKey}/`).subscribe( category =>{
      let catModel: CategoryModel = category;
      this.categoryTitle = catModel.title;
      this.photoImage = catModel.members[subject].url; 
      this.subjectTitle = catModel.members[subject].title; 
    });
  }
  
  private drawSpy(categoryKey: string) {
    this.af.object(`categories/${categoryKey}/`).subscribe( category =>{
      this.categoryTitle = category.title;
    });

    this.photoImage = "assets/spy2.png";
    this.subjectTitle = "Mole";
    this.isSpy = true;

    // wait till other users will vote
    if(this.isSpy) {
      this.af.object(`rounds/${this.roomsService.currentRoom.$key}/${this.roundKey}/spyState`).subscribe(spy =>{
          console.log("the state is " + spy.$value);
        if(spy.$value == "found") {
          this.dismissLoading();
          // go to guess subject page
          clearInterval(this.id);

          this.navCtrl.push("GuessPage", { roundKey: this.roundKey });
        }
        else if(spy.$value == "win" || spy.$value == "semi-win" || spy.$value == "lose") {
          this.dismissLoading();
          clearInterval(this.id);
          this.addPointsToSpy(spy.$value);
          // go to score page 
          this.navCtrl.push('ScorePage',  { roundKey: this.roundKey, spyState: spy.$value });
        }
        else if(spy.$value == "damaged") { // preserve for times when some of the players leave the room
          clearInterval(this.id);
          this.dismissLoading();

          this.msgService.showMsg("Sorry", "One of the players left the room, you are directed to the room");
          this.navCtrl.popTo("LobbyPage");
        }
      });
    }
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Wait till all players vote...",
    });
    this.loader.present();
  }

  private dismissLoading(){
    if(this.loader != null)
      this.loader.dismiss();
  }

  public LeaveGame() {
      clearInterval(this.id);
      if(!this.isSpy) {
        this.navCtrl.push('EndGamePage', {
          roundKey: this.roundKey
        });
      }
      else {
        this.presentLoading();
      }
  }
}
