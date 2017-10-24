import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsModel } from '../../Models/settings.model';
import { RoomsService } from '../../services/rooms.service';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  settings: SettingsModel = new SettingsModel;
  settingsKey: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public roomsService: RoomsService, 
              public af: AngularFireDatabase) {
    
    let roomKey = navParams.get('roomKey');

    // get the settings of the current room
    af.object(`rooms/${roomKey}/settingsKey`).subscribe( t=> {
      af.object(`settings/${t.$value}`).subscribe(set=>{
        this.settings = set;
        this.settingsKey = t.$value;
      });
    });
  }

  public submit() {
    this.af.object(`settings/${this.settingsKey}`).set(this.settings);
    this.navCtrl.pop();
  }


}
