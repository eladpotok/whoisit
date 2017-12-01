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
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service'

 @Injectable()
 export class RoomsService {

    private static _currentRooms: RoomModel;
    private static _currentRound: RoundModel;
    private static _cuurentRoundKey: string;
    private static _currentSpy: string;
    public static roomKey: string;
    private isOwnerLeft: Boolean = false;
    public loadUserSubscriber: any;
    public roomClosedSubscriber: any;
    public usersModel: UserModel[] = [];
    public usersCount: number;

    constructor(public afAuth: AngularFireAuth, private fb: Facebook,
                private platform: Platform, public af: AngularFireDatabase, 
                public msgService: MessagesService, private authService: AuthService) {

    }

    private dispose() {
        if(this.roomClosedSubscriber != null)
            this.roomClosedSubscriber.unsubscribe();

        if(this.loadUserSubscriber != null)
            this.loadUserSubscriber.unsubscribe();
    }

    public checkRoomClosed(isOwner: Boolean, leaveToRoot: Function) {
        this.roomClosedSubscriber = this.af.object(`rooms/${RoomsService.roomKey}/isClosed`).subscribe( t=> {
            if(t.$value != null)
                this.isOwnerLeft = t.$value;
            console.log("check Room Closed value = " + this.isOwnerLeft);
            if(t.$value && !isOwner) {
                this.msgService.showMsg("Oh No!", "The owner of the room just left the room. You are redirected back to the home page")
                this.leaveRoom(isOwner);
                console.log("leave to root");
                // leave to the home page
                leaveToRoot();
            }
        });
    }

    private checkUserLeft(newUserCount: number, isOwner: Boolean, currentRound: string, leaveToLobby: Function) {
        if(this.usersCount > newUserCount) {
            this.msgService.showToast("One of the players left the room");
            if(isOwner){
                this.af.object(`rooms/${RoomsService.roomKey}/usersCount`).set(newUserCount);
                this.af.object(`rooms/${RoomsService.roomKey}/isStarted`).set(false);
                this.af.object(`rounds/${RoomsService.roomKey}/${currentRound}/state`).set("done");
            }
            leaveToLobby();
        }
    }  

    public loadUsers(isOwner: Boolean, currentRound: string, roomKey: string, leaveToLobby: Function) {
        RoomsService.roomKey = roomKey;

        // get the users in the current room
        this.loadUserSubscriber = this.af.list(`rooms/${roomKey}/users`).subscribe( snapshots => {
            if(this.isOwnerLeft != null && !this.isOwnerLeft)
                this.checkUserLeft(snapshots.length, isOwner, currentRound, leaveToLobby);
    
            this.usersModel = [];
            this.usersCount = snapshots.length;
            snapshots.forEach( snapshot=> {
                let userId = snapshot.$key;
                let points = snapshot.$value;
                
                this.af.object(`users/${userId}`).subscribe( t=> {
                    t.pointsInRoom = points;
                    this.usersModel.push(t);
                });
            });
        });
    }

    public leaveRoom(isOwner: Boolean) {
        
        this.dispose();
  
        if(isOwner) {
            // alert that the room is closed
            this.af.object(`rooms/${RoomsService.roomKey}/isClosed`).set(true);
        }
        this.af.list(`rooms/${RoomsService.roomKey}/users/`).remove(this.authService.currentUser.$key);
    }

    public get currentRoom(): RoomModel {
        return RoomsService._currentRooms;
    }

    public get currentRoundKey(): string {
        return RoomsService._cuurentRoundKey;
    }

    public setCurrentRoundKey(roundKey: string) {
        RoomsService._cuurentRoundKey = roundKey;
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
        RoomsService._currentSpy = spy;
    }

    public getSpy() : string {
        return RoomsService._currentSpy;
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
        // if(RoomsService._currentRooms == null) {
            console.log("update once again the room");
            RoomsService._currentRooms = new RoomModel;
            RoomsService._currentRooms.users = [];
            this.af.object(`rooms/${roomKey}`).subscribe(t=> {
                RoomsService._currentRooms.$key = t.$key;  
                RoomsService._currentRooms.categoryName = t.categoryName;
                RoomsService._currentRooms.roomName = t.roomName;
                RoomsService._currentRooms.settingsKey = t.settingsKey;
                
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
        // }
    }

 }
