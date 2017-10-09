import {AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserModel } from '../Models/user.model'
import { RoomModel } from '../Models/room.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
 @Injectable()
 export class RoomsService {

    private static _currentRooms: RoomModel;

    constructor(public afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform, public af: AngularFireDatabase) {

    }

    public getUsersFromRoom() : UserModel[] {
        return RoomsService._currentRooms.users;
    }

    public updateUsersInRoom(roomKey: string) {
        if(RoomsService._currentRooms == null){
            RoomsService._currentRooms = new RoomModel;
            RoomsService._currentRooms.users = [];
            this.af.object(`rooms/${roomKey}`).subscribe(t=> {
                RoomsService._currentRooms.$key = t.$key;  
                RoomsService._currentRooms.categoryName = t.categoryName;
                RoomsService._currentRooms.roomName = t.roomName;
                
            });
            this.af.list(`rooms/${roomKey}/users`, { preserveSnapshot: true}).subscribe(t=> {
                    t.forEach(user=>{
                    let userKey = user.key;
                   
                    this.af.object(`users/${userKey}`).subscribe( userDetail => {
                        RoomsService._currentRooms.users.push(userDetail);
                    });
                
                });
            });
        }
    }

 }
