import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CategoryModel } from '../../Models/category.model';
import { AuthService } from '../../services/auth.service';
import {RoomsService } from '../../services/rooms.service';

@IonicPage()
@Component({
  selector: 'page-choose-category',
  templateUrl: 'choose-category.html',
})
export class ChooseCategoryPage {

  categoryName: string;
  categories: CategoryModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private roomService: RoomsService) {
    
    console.log("enter to ctor of category selection");

    this.af.list(`categories/`).subscribe(t=>{
      this.categories = t;
    });
  }

  select(category: CategoryModel) {
    // get the room key
    let roomKey = this.navParams.get('roomKey');
    let roundKey = this.navParams.get('roundKey');

    // random a subject from category 
    let randomSecret = Math.floor( Math.random() * category.members.length);

    this.af.object(`/rounds/${roomKey}/${roundKey}/secret`).set(randomSecret);
    this.af.object(`/rounds/${roomKey}/${roundKey}/isCategorySelected`).set(true);
    this.af.object(`/rounds/${roomKey}/${roundKey}/categoryKey`).set(category.$key);
  }
}
