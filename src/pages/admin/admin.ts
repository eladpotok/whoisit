import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MemberModel } from '../../Models/category.model'
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  categoryName: string;
  indexPhoto: number;
  subjectTitle: string;
  format: string = "png"
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {

  }
  
  public add() {
    let subscription = this.af.list(`categories/`).subscribe(t=>{
      t.forEach(cat=> {
        if(cat.title == this.categoryName){
          let member: MemberModel = {
            title: this.subjectTitle,
            url: "assets/" + this.categoryName + "/" + this.indexPhoto.toString() + "." + this.format
          }
          subscription.unsubscribe();
          this.af.object(`categories/${cat.$key}/members/${this.indexPhoto}`).set(member);
        }
      });
    });
  }



}
