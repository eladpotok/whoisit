import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
import { RoundModel } from '../../Models/round.model';
import { RoomsService } from '../../services/rooms.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-end-game',
  templateUrl: 'end-game.html',
})
export class EndGamePage {

  loader: any;
  spyReadyToVote: boolean;
  isTheSpy: boolean;
  usersModel: UserModel[] = [];
  roomKey: string;
  roundKey: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase,
              public roomService: RoomsService, public auth: AuthService, public loadingCtrl: LoadingController) {
                console.log("enter to ctor of end-game");
    this.roomKey = this.navParams.get('roomKey');
    this.roundKey = this.navParams.get('roundKey');

    if(this.roundKey != null) {
          this.af.object(`rounds/${this.roundKey}/votesCount`).set(0);
          this.af.object(`rounds/${this.roundKey}/votes/dummy`).set(true);
    } 
    else {
      this.af.list(`rounds/`).subscribe( t=> {
        t.forEach( room => {
          if(room.roomKey == this.roomKey){
            this.roomKey = room.$key;
            return;
          }
        });
      });
    }

    // get all of the users in the room
    this.usersModel = roomService.getUsersFromRoomButme(this.auth.currentUser);
    if(roomService.getSpy() ==  this.auth.currentUser.$key) {
    
      this.isTheSpy = true;
      this.presentLoadingSpy();
    }

    console.log("loading");
      // wait till all users will vote
      af.object(`rounds/${this.roundKey}/isAllVoted`).subscribe( t=> {
          // all users voted
         if(t.$value) {
           // check if i am the spy
            if(this.auth.currentUser.$key == this.roomService.getSpy()) {
              this.dismissLoadingPlayer();
              af.object(`/rounds/${this.roundKey}/isSpyWon`).subscribe( spy=> {
                if(spy.$value == null){
                  return;
                }
                
                // check if the spy won
                if(spy.$value) {
                  this.navCtrl.push('ScorePage', {
                          roundKey: this.roundKey,
                          roomKey: this.roomKey
                  });
                }
                else{ // spy lose
                  af.object(`rounds/${this.roundKey}/`).subscribe(cat =>{
                    
                          this.navCtrl.push('GuessPage', {
                            category: cat.categoryName,
                            secret:  cat.secret,
                            roundKey: this.roundKey
                  })});
                }
              });
            }
            else { // i am not the spy

              af.object(`/rounds/${this.roundKey}/isSpyWon`).subscribe( spy=> {
                
                // if the spy won so we move to score page
                if(spy.$value) {
                  this.dismissLoadingPlayer();
                  console.log("go to score page");
                  this.navCtrl.push('ScorePage', {
                            roundKey: this.roundKey,
                            roomKey: this.roomKey
                      });
                }
                else {
                this.af.object(`rounds/${this.roundKey}/isSpyGuess`).subscribe( guess => {

                    if(guess.$value) {
                      this.dismissLoadingPlayer();;
                      console.log("go to score page");
                      this.navCtrl.push('ScorePage', {
                              roundKey: this.roundKey,
                              roomKey: this.roomKey
                        });
                    }
                  });
                }
              });
              
            }
         }
  
      });
}

presentLoadingSpy() {
    this.loader = this.loadingCtrl.create({
      content: "Wait till all players vote...",
    });
    this.loader.present();
  }

  presentLoadinPlayer() {
    this.loader = this.loadingCtrl.create({
      content: "Wait till all players vote...",
    });
    this.loader.present();
  }





  private dismissLoadingPlayer(){
    if(this.loader != null)
      this.loader.dismiss();
  }

  selectUser(user: UserModel) {

    
    
    let counter = 0;  
    let subscribtion = this.af.object(`/rounds/${this.roundKey}/votes/${user.$key}`).subscribe(u => {
      counter = u.$value;
      if(subscribtion != null)
        subscribtion.unsubscribe();
      counter++;
      this.af.object(`/rounds/${this.roundKey}/votes/${user.$key}`).set(counter);
    });
    if(user.$key == this.roomService.getSpy()) {
      this.auth.currentUser.pointsInRoom += 2;

      // add the current user to the win user list
      this.af.list(`/rounds/${this.roundKey}/wins/`).push(this.auth.currentUser.$key);
    }
    else {
      // add the current user to the lose user list
      this.af.list(`/rounds/${this.roundKey}/loses/`).push(this.auth.currentUser.$key);
    }

    // in case you find the real spy you get 3 points
    this.af.object(`/rooms/${this.roomKey}/users/${this.auth.currentUser.$key}`).set(this.auth.currentUser.pointsInRoom);

    this.presentLoadinPlayer();
  }
}
