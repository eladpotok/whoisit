import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public goTo(pageNum: number) {
    switch(pageNum) {
      case 1:
      this.navCtrl.push("InstructionsPage");
      break;
      case 2:
      this.navCtrl.push("PointsInfoPage");
      break;
      case 3:
      this.navCtrl.push("AboutPage");
      break;
    }
  }

}
