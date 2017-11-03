import {AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserModel } from '../Models/user.model'
import { RoomModel } from '../Models/room.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RoundModel } from '../Models/round.model';
import { Platform, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable'; 
 
 @Injectable()
  export class MessagesService {
    constructor(public afAuth: AngularFireAuth, private fb: Facebook, public alertCtrl: AlertController,
                private platform: Platform, public af: AngularFireDatabase) {
            
    }

    public showMsg(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
            });
        alert.present();
    }
  }