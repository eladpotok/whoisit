import {AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserModel } from '../Models/user.model'
import { RoomModel } from '../Models/room.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RoundModel } from '../Models/round.model';
import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';

 @Injectable()
 export class RoomsService {

    private static _currentRooms: RoomModel;
    private static _currentRound: RoundModel;

    constructor(public afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform, public af: AngularFireDatabase) {

    }

    public get currentRoom(): RoomModel {
        return RoomsService._currentRooms;
    }

    public getRoundBy(roomKey: string) : RoundModel {

        if(RoomsService._currentRound != null)
            return RoomsService._currentRound;

        this.af.list(`rounds/`).subscribe(round=> {
            round.forEach( r => {
                if(r.roomKey == roomKey) {
                    return r;
                }
            });
        });

        
    }

    public setSpy(spy: string) {
        RoomsService._currentRooms.spy = spy;
    }

    public getSpy() : string {
        return RoomsService._currentRooms.spy;
    }

    public getUsersFromRoom() : UserModel[] {
        return RoomsService._currentRooms.users;
    }

    public getUsersFromRoomButme(user: UserModel) : UserModel[] {
        return this.getUsersFromRoom().filter(t=> t.displayName != user.displayName);
    }

    public getUser(userKey: string) : UserModel {
        return RoomsService._currentRooms.users.find( t=> t.$key == userKey);
    }

    public getNonSpyPlayers() : UserModel[] {
        let result: UserModel[] = [];
        this.getUsersFromRoom().forEach(t=> {
            if(t.$key != this.getSpy())
                result.push(t);
        });
        return result;
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
                    let points = user.val();
                    this.af.object(`users/${userKey}`).subscribe( userDetail => {
                        if(RoomsService._currentRooms.users.map( t=> t.$key).indexOf(userKey) == -1 ) {
                            userDetail.pointsInRoom = points;
                            RoomsService._currentRooms.users.push(userDetail);
                        }
                    });
                });
            });
        }
    }

 }
