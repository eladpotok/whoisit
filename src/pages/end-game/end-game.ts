import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../Models/user.model';
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
  roundKey: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFireDatabase,
              public roomService: RoomsService, public auth: AuthService, public loadingCtrl: LoadingController) {

    // get the round key
    this.roundKey = this.navParams.get('roundKey');
    
    
    // show the suspisious users
    this.usersModel = this.loadUsers();

    this.af.object(`rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/isAllVoted`).subscribe(votes => {
      // check if all users voted
      if(votes.$value) {
        this.af.object(`rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/spyState`).subscribe(spy =>{
          if(spy.$value == "win" || spy.$value == "semi-win" || spy.$value == "lose") {
            this.dismissLoading();

            this.addPointsToPlayer(spy.$value);
            // go to score page 
            this.navCtrl.push('ScorePage',  { roundKey: this.roundKey, spyState: spy.$value});
          }
        });
      }
    });
 
  }

  private addPointsToPlayer(spyState: string) {
    if(spyState == "lose") {
      this.auth.currentUser.pointsInRoom += 3;
      this.af.object(`/rooms/${this.roomService.currentRoom.$key}/users/${this.auth.currentUser.$key}`).set(this.auth.currentUser.pointsInRoom);
    }
  }

  private loadUsers() : UserModel[] {
    return this.roomService.getUsersFromRoomButme(this.auth.currentUser);
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Wait till all players vote  ...",
    });
    this.loader.present();
  }

  private dismissLoading(){
    if(this.loader != null)
      this.loader.dismiss();
  }

  private voteUser(user: UserModel) {
    let counter = 0;  
    let subscribtion = this.af.object(`/rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/votes/${user.$key}`).subscribe(u => {
      counter = u.$value;
      
      if(subscribtion != null)
        subscribtion.unsubscribe();
      counter++;
      this.af.object(`/rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/votes/${user.$key}`).set(counter);
      this.af.object(`/rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/votesStatus/${this.auth.currentUser.displayName}`).set(user.displayName);
    });
  }

  public selectUser(user: UserModel) {
    
    // show loader
    this.presentLoading();

    // vote for the selected user
    this.voteUser(user);
    console.log("the spy is " + this.roomService.getSpy());
    // check if I selected right
    if(user.$key == this.roomService.getSpy()) {
      this.auth.currentUser.pointsInRoom += 1;

      // add the current user to the win user list
      this.af.list(`/rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/wins/`).push(this.auth.currentUser.$key);
    }
    else {
      // add the current user to the lose user list
      this.af.list(`/rounds/${this.roomService.currentRoom.$key}/${this.roundKey}/loses/`).push(this.auth.currentUser.$key);
    }

    // in case you find the real spy you get 1 points
    this.af.object(`/rooms/${this.roomService.currentRoom.$key}/users/${this.auth.currentUser.$key}`).set(this.auth.currentUser.pointsInRoom);
  }
}
