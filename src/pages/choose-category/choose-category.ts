import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CategoryModel } from '../../Models/category.model';
import { AuthService } from '../../services/auth.service';
import { RoundModel } from '../../Models/round.model';

@IonicPage()
@Component({
  selector: 'page-choose-category',
  templateUrl: 'choose-category.html',
})
export class ChooseCategoryPage {

  categoryName: string;
  categories: CategoryModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private authService: AuthService) {
    console.log("enter to ctor of category selection");
    this.af.list(`categories/`).subscribe(t=>{
      this.categories = t;
    });
  }

  select(category: CategoryModel) {
    console.log("Choose member");
    let roomKey = this.navParams.get('roomKey');
    //let roundKey = this.navParams.get('roundKey');
    this.af.object(`/rooms/${roomKey}/isCategorySelected`).set(true);
    let randomSecret = Math.floor( Math.random() * category.members.length);

    let sub = this.af.list(`rounds/`).subscribe( round=>{
      round.forEach( r => {
        if(r.roomKey == roomKey){
          console.log("enter to if");
             sub.unsubscribe();
             this.af.object(`rounds/${r.$key}/categoryName`).set(category.$key);

              console.log(" roomd key in choose-category " + roomKey);
           //   console.log(" roundKey key in choose-category " + roundKey);
              this.navCtrl.push('GamePage', { 
                roomKey: roomKey,
                roundKey: r.$key
              });
        }
      });
    });

    // let round: RoundModel = {
    //   categoryName: category.$key,
    //   selectorKey: this.authService.currentUser.displayName,
    //   spyKey: this.navParams.get('spy'),
    //   roomKey: roomKey,
    //   state: "init",
    //   secret: randomSecret
    // }
    console.log("before");
    // add game to db
    //let roundKey = this.af.list(`rounds/`).push(round).key;

   
  }

}
