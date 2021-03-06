webpackJsonp([12],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_room_model__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_messages_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RoomsService = RoomsService_1 = (function () {
    function RoomsService(afAuth, fb, platform, af, msgService, authService) {
        this.afAuth = afAuth;
        this.fb = fb;
        this.platform = platform;
        this.af = af;
        this.msgService = msgService;
        this.authService = authService;
        this.isOwnerLeft = false;
        this.usersModel = [];
    }
    RoomsService.prototype.dispose = function () {
        if (this.roomClosedSubscriber != null)
            this.roomClosedSubscriber.unsubscribe();
        if (this.loadUserSubscriber != null)
            this.loadUserSubscriber.unsubscribe();
    };
    RoomsService.prototype.checkRoomClosed = function (isOwner, leaveToRoot) {
        var _this = this;
        this.roomClosedSubscriber = this.af.object("rooms/" + RoomsService_1.roomKey + "/isClosed").subscribe(function (t) {
            if (t.$value != null)
                _this.isOwnerLeft = t.$value;
            console.log("check Room Closed value = " + _this.isOwnerLeft);
            if (t.$value && !isOwner) {
                _this.msgService.showMsg("Oh No!", "The owner of the room just left the room. You are redirected back to the home page");
                _this.leaveRoom(isOwner);
                console.log("leave to root");
                // leave to the home page
                leaveToRoot();
            }
        });
    };
    RoomsService.prototype.checkUserLeft = function (newUserCount, isOwner, currentRound, leaveToLobby) {
        if (this.usersCount > newUserCount) {
            this.msgService.showToast("One of the players left the room");
            if (isOwner) {
                this.af.object("rooms/" + RoomsService_1.roomKey + "/usersCount").set(newUserCount);
                this.af.object("rooms/" + RoomsService_1.roomKey + "/isStarted").set(false);
                this.af.object("rounds/" + RoomsService_1.roomKey + "/" + currentRound + "/state").set("done");
            }
            leaveToLobby();
        }
    };
    RoomsService.prototype.loadUsers = function (isOwner, currentRound, roomKey, leaveToLobby) {
        var _this = this;
        RoomsService_1.roomKey = roomKey;
        // get the users in the current room
        this.loadUserSubscriber = this.af.list("rooms/" + roomKey + "/users").subscribe(function (snapshots) {
            if (_this.isOwnerLeft != null && !_this.isOwnerLeft)
                _this.checkUserLeft(snapshots.length, isOwner, currentRound, leaveToLobby);
            _this.usersModel = [];
            _this.usersCount = snapshots.length;
            snapshots.forEach(function (snapshot) {
                var userId = snapshot.$key;
                var points = snapshot.$value;
                _this.af.object("users/" + userId).subscribe(function (t) {
                    t.pointsInRoom = points;
                    _this.usersModel.push(t);
                });
            });
        });
    };
    RoomsService.prototype.leaveRoom = function (isOwner) {
        this.dispose();
        if (isOwner) {
            // alert that the room is closed
            this.af.object("rooms/" + RoomsService_1.roomKey + "/isClosed").set(true);
        }
        this.af.list("rooms/" + RoomsService_1.roomKey + "/users/").remove(this.authService.currentUser.$key);
    };
    Object.defineProperty(RoomsService.prototype, "currentRoom", {
        get: function () {
            return RoomsService_1._currentRooms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomsService.prototype, "currentRoundKey", {
        get: function () {
            return RoomsService_1._cuurentRoundKey;
        },
        enumerable: true,
        configurable: true
    });
    RoomsService.prototype.setCurrentRoundKey = function (roundKey) {
        RoomsService_1._cuurentRoundKey = roundKey;
    };
    RoomsService.prototype.getRoundBy = function (roomKey) {
        if (RoomsService_1._currentRound != null)
            return RoomsService_1._currentRound;
        this.af.list("rounds/").subscribe(function (round) {
            round.forEach(function (r) {
                if (r.roomKey == roomKey) {
                    return r;
                }
            });
        });
    };
    RoomsService.prototype.setSpy = function (spy) {
        RoomsService_1._currentSpy = spy;
    };
    RoomsService.prototype.getSpy = function () {
        return RoomsService_1._currentSpy;
    };
    RoomsService.prototype.getUsersFromRoom = function () {
        return RoomsService_1._currentRooms.users;
    };
    RoomsService.prototype.getUsersFromRoomButme = function (user) {
        return this.getUsersFromRoom().filter(function (t) { return t.displayName != user.displayName; });
    };
    RoomsService.prototype.getUser = function (userKey) {
        return RoomsService_1._currentRooms.users.find(function (t) { return t.$key == userKey; });
    };
    RoomsService.prototype.getNonSpyPlayers = function () {
        var _this = this;
        var result = [];
        this.getUsersFromRoom().forEach(function (t) {
            if (t.$key != _this.getSpy())
                result.push(t);
        });
        return result;
    };
    RoomsService.prototype.updateUsersInRoom = function (roomKey) {
        var _this = this;
        // if(RoomsService._currentRooms == null) {
        console.log("update once again the room");
        RoomsService_1._currentRooms = new __WEBPACK_IMPORTED_MODULE_2__Models_room_model__["a" /* RoomModel */];
        RoomsService_1._currentRooms.users = [];
        this.af.object("rooms/" + roomKey).subscribe(function (t) {
            RoomsService_1._currentRooms.$key = t.$key;
            RoomsService_1._currentRooms.categoryName = t.categoryName;
            RoomsService_1._currentRooms.roomName = t.roomName;
            RoomsService_1._currentRooms.settingsKey = t.settingsKey;
        });
        this.af.list("rooms/" + roomKey + "/users", { preserveSnapshot: true }).subscribe(function (t) {
            t.forEach(function (user) {
                var userKey = user.key;
                var points = user.val();
                _this.af.object("users/" + userKey).subscribe(function (userDetail) {
                    if (RoomsService_1._currentRooms.users.map(function (t) { return t.$key; }).indexOf(userKey) == -1) {
                        userDetail.pointsInRoom = points;
                        RoomsService_1._currentRooms.users.push(userDetail);
                    }
                });
            });
        });
        // }
    };
    return RoomsService;
}());
RoomsService = RoomsService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_6__services_messages_service__["a" /* MessagesService */], __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */]])
], RoomsService);

var RoomsService_1;
//# sourceMappingURL=rooms.service.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseModel; });
var BaseModel = (function () {
    function BaseModel() {
    }
    return BaseModel;
}());

//# sourceMappingURL=base.model.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		452,
		11
	],
	"../pages/admin/admin.module": [
		453,
		10
	],
	"../pages/choose-category/choose-category.module": [
		454,
		9
	],
	"../pages/end-game/end-game.module": [
		455,
		8
	],
	"../pages/game/game.module": [
		456,
		0
	],
	"../pages/guess/guess.module": [
		457,
		7
	],
	"../pages/info/info.module": [
		458,
		6
	],
	"../pages/instructions/instructions.module": [
		459,
		5
	],
	"../pages/lobby/lobby.module": [
		460,
		4
	],
	"../pages/points-info/points-info.module": [
		461,
		3
	],
	"../pages/score/score.module": [
		462,
		2
	],
	"../pages/settings/settings.module": [
		463,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 208;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_model__ = __webpack_require__(159);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserModel;
}(__WEBPACK_IMPORTED_MODULE_0__base_model__["a" /* BaseModel */]));

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_user_model__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_messages_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_rooms_service__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = (function () {
    function HomePage(navCtrl, afAuth, af, fb, platform, alertCtrl, msgService, authService, viewCtrl, roomService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.af = af;
        this.fb = fb;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.msgService = msgService;
        this.authService = authService;
        this.viewCtrl = viewCtrl;
        this.roomService = roomService;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_2__Models_user_model__["a" /* UserModel */];
        this.isDebug = false;
        this.alert = null;
        this.waitForRegistration();
        this.isDebug = this.authService.IsDebug;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                if (_this.alert != null)
                    return;
                if (navCtrl.getActive().name == "HomePage") {
                    _this.showExitAlert();
                }
                else if (_this.pageGoBack()) {
                    navCtrl.pop();
                }
                else {
                    _this.showAlert();
                }
            });
        });
        this.operation = "openRoom";
        this.isOpenRoomSelected = true;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.roomEntryCode = null;
        this.roomName = null;
    };
    HomePage.prototype.pageGoBack = function () {
        if (this.navCtrl.getActive().name != "ChooseCategoryPage" &&
            this.navCtrl.getActive().name != "GamePage" &&
            this.navCtrl.getActive().name != "ScorePage" &&
            this.navCtrl.getActive().name != "GuessPage" &&
            this.navCtrl.getActive().name != "LobbyPage") {
            return true;
        }
        return false;
    };
    HomePage.prototype.showAlert = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Leave?',
            message: 'Do you want to leave the room?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        _this.alert = null;
                    }
                },
                {
                    text: 'Leave',
                    handler: function () {
                        _this.alert = null;
                        console.log("the current user is " + _this.authService.currentUser);
                        console.log("is owner " + _this.authService.currentUser.isOwner);
                        if (_this.authService.currentUser.isOwner) {
                            // alert that the room is closed
                            console.log("you are owner " + __WEBPACK_IMPORTED_MODULE_8__services_rooms_service__["a" /* RoomsService */].roomKey);
                            _this.af.object("rooms/" + __WEBPACK_IMPORTED_MODULE_8__services_rooms_service__["a" /* RoomsService */].roomKey + "/isClosed").set(true);
                            _this.roomService.leaveRoom(true);
                        }
                        else {
                            _this.roomService.leaveRoom(false);
                        }
                        _this.navCtrl.popToRoot();
                    }
                }
            ]
        });
        this.alert.present();
    };
    HomePage.prototype.showExitAlert = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Exit?',
            message: 'Do you want to exit the app?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        _this.alert = null;
                    }
                },
                {
                    text: 'Exit',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }
            ]
        });
        this.alert.present();
    };
    HomePage.prototype.waitForRegistration = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.clearUser();
                return;
            }
            _this.authService.activeUser(user);
            if (_this.authService.isAuthenticated) {
                _this.currentUser = _this.authService.currentUser;
            }
        });
    };
    HomePage.prototype.clearUser = function () {
        this.authService.clearUser();
        this.currentUser.displayName = "";
        this.currentUser.isAuthenticated = false;
    };
    HomePage.prototype.openRoomSubmit = function () {
        if (this.roomName == null ||
            this.currentUser.displayName == null) {
            this.msgService.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
            return;
        }
        var roomKey = this.createRoom();
        this.addUserToRoom(roomKey, true);
    };
    HomePage.prototype.createRoom = function () {
        var settingsModel = {
            timeElapsed: 7,
        };
        // add new settings to db
        var settingsKey = this.af.list("settings").push(settingsModel).key;
        var roomModel = {
            owner: this.currentUser.displayName,
            roomName: this.roomName,
            categoryName: "empty",
            entryCode: this.generateCode(),
            isCategorySelected: false,
            users: [],
            spy: "",
            settingsKey: settingsKey,
        };
        var roomKey = this.af.list("/rooms").push(roomModel).key;
        return roomKey;
    };
    HomePage.prototype.generateCode = function () {
        var codePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //abcdefghijklmnopqrstuvwxyz
        var code = "";
        for (var i = 0; i < 4; i++) {
            code += codePool.charAt(Math.random() * codePool.length);
        }
        return code;
    };
    HomePage.prototype.addUserToRoom = function (roomKey, isOwner) {
        var _this = this;
        // check if the user is authenticated 
        if (!this.authService.isAuthenticated)
            this.authService.addGuestUser(this.currentUser.displayName, roomKey, isOwner);
        else {
            this.af.object("rooms/" + roomKey + "/users/" + this.authService.currentUser.$key).set(0);
            this.authService.getPointsInRoom(this.currentUser, roomKey).subscribe(function (t) {
                _this.currentUser.pointsInRoom = t.$value;
            });
        }
        console.log("go to lobby with key " + roomKey);
        this.navCtrl.push('LobbyPage', {
            roomKey: roomKey
        });
    };
    HomePage.prototype.openRoom = function () {
        this.isOpenRoomSelected = true;
    };
    HomePage.prototype.nameExists = function () {
        return this.usersInRoom.map(function (t) { return t.displayName; }).indexOf(this.currentUser.displayName) != -1;
    };
    HomePage.prototype.about = function () {
        this.navCtrl.push('InfoPage');
    };
    HomePage.prototype.joinRoomSubmit = function () {
        var _this = this;
        if (this.currentUser.displayName == null ||
            this.roomEntryCode == null) {
            this.msgService.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
            return;
        }
        var roomFound = false;
        var userFound = false;
        var subscription = this.af.list('/rooms', { preserveSnapshot: true }).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                // we find the room by entry code
                if (snapshot.val().entryCode != null && snapshot.val().entryCode.toUpperCase() == _this.roomEntryCode.toUpperCase()) {
                    roomFound = true;
                    // check if the room is not started yet
                    if (!snapshot.val().isStarted) {
                        if (!snapshot.val().isClosed) {
                            // iterate over the users so there is not a user with a same name
                            var sub_1 = _this.af.list("rooms/" + snapshot.key + "/usernames", { preserveSnapshot: true }).subscribe(function (t) {
                                t.forEach(function (u) {
                                    if (u != null) {
                                        if (u.val() == _this.currentUser.displayName) {
                                            _this.msgService.showMsg("Sorry", "The given name is already exists in the room");
                                            sub_1.unsubscribe();
                                            userFound = true;
                                            return;
                                        }
                                    }
                                });
                                if (!userFound)
                                    _this.addUserToRoom(snapshot.key, false);
                                sub_1.unsubscribe();
                            });
                        }
                        else {
                            _this.msgService.showMsg("Sorry", "The room is no longer activated");
                        }
                    }
                    else {
                        _this.msgService.showMsg("Sorry", "The room is in during the game");
                    }
                    subscription.unsubscribe();
                }
            });
            if (!roomFound) {
                _this.msgService.showMsg("Room does not exist", "The key which is given is not exist!");
                subscription.unsubscribe();
            }
        });
    };
    HomePage.prototype.joinRoom = function () {
        this.isOpenRoomSelected = false;
    };
    HomePage.prototype.submitRoom = function () {
        if (this.isOpenRoomSelected) {
            this.openRoomSubmit();
        }
        else {
            this.joinRoomSubmit();
        }
    };
    HomePage.prototype.signInWithFacebook = function () {
        this.authService.signInWithFacebook();
        this.currentUser = this.authService.currentUser;
    };
    HomePage.prototype.signOut = function () {
        this.authService.signOut();
    };
    HomePage.prototype.adminPanel = function () {
        this.navCtrl.push('AdminPage');
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\mole-app\trunk\src\pages\home\home.html"*/'\nbower_components/momentjs/min/moment.min.js\nbower_components/momentjs/min/locales.min.js\nbower_components/humanize-duration/humanize-duration.js\n\n<ion-content class="homeBody">\n\n\n\n<!--<ion-grid>\n  <ion-row>\n      <button ion-button class="newRoomButton">\n        New Room\n      </button>\n\n      <button ion-button class="newRoomButton">\n        Join Room\n      </button>\n  </ion-row>\n</ion-grid>\n-->\n\n\n<img src="assets/home.png" class="photoHome"/>\n\n<div [ngSwitch]="operation" ngClass="middle-vertical">\n\n  \n\n\n    <ion-segment [(ngModel)]="operation" class="operationItem" color="light">\n        <ion-segment-button value="openRoom" (click)="openRoom()" class="buttonHoverAnimation" >\n           <!-- <ion-icon name="create"></ion-icon> -->\n           <label >New Room</label>\n        </ion-segment-button>\n        <ion-segment-button value="joinRoom" (click)="joinRoom()" class="buttonHoverAnimation" >\n          <!-- <ion-icon name="person-add"></ion-icon> -->\n          <label >Join Room</label>\n        </ion-segment-button>\n      </ion-segment>\n\n      <label class="loginWelcomeText">Welcome</label>\n\n  <ion-grid *ngSwitchCase="\'openRoom\'" style="width: 80%">\n\n    <ion-row  no-lines>\n        <ion-icon name="person" class="loginIcon"></ion-icon>\n        <ion-input [disabled]="currentUser.isAuthenticated" type="text" value="" class="loginInput" placeholder="Username" [(ngModel)]="currentUser.displayName"></ion-input>\n    </ion-row>\n\n    <ion-row >\n          <ion-icon name="create" class="loginIcon"></ion-icon>\n          <ion-input type="text" value="" placeholder="Room Name" [(ngModel)]="roomName" class="loginInput" ></ion-input>\n    </ion-row> \n  </ion-grid>\n\n  <ion-grid *ngSwitchCase="\'joinRoom\'" style="width: 80%">\n\n    <ion-row  no-lines >\n        <ion-icon name="person" class="loginIcon"></ion-icon>\n        <ion-input [disabled]="currentUser.isAuthenticated" type="text" value="" class="loginInput" placeholder="Username" [(ngModel)]="currentUser.displayName"></ion-input>\n    </ion-row>\n\n    <ion-row >\n      <ion-icon name="lock" class="loginIcon"></ion-icon>\n      <ion-input type="text" value="" [(ngModel)]="roomEntryCode" class="loginInput" placeholder="Entry Code" ></ion-input>\n    </ion-row> \n  </ion-grid>\n\n\n\n\n\n  <button ion-button   icon-start class="goButton" (click)="submitRoom()">\n       Play \n  </button>\n  <!--<button ion-button color="dark" round icon-start class="goButton" (click)="signInWithFacebook()" *ngIf="!currentUser.isAuthenticated">\n       Sign with FaceBook \n  </button>\n  <button ion-button color="dark" round icon-start class="goButton" (click)="signOut()" *ngIf="currentUser.isAuthenticated">\n       Logout \n  </button>-->\n  <ion-grid class="loginBottomNav" style="text-align: center">\n    <label  (click)="about()" >\n        ABOUT \n    </label>\n    <label style="color: rgb(21, 29, 51); font-size: 15px; margin-left: 5px; margin-right: 5px;">|</label>\n    <label    >\n      SETTINGS\n    </label>\n    <br>\n    <label  (click)="adminPanel()" *ngIf="isDebug" >\n        ADMIN \n    </label>\n  </ion-grid>\n\n <ion-item ion-item no-lines ngClass="profileCard" *ngIf="isUserAuthorized">\n      <ion-avatar item-start >\n        <img [src]="photoUrl" ngClass="photo">\n      </ion-avatar>\n      <h2 > Hello {{ displayName }}</h2>\n      <p>Ugh. As if.</p>\n    </ion-item>\n</div>\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"C:\mole-app\trunk\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__services_messages_service__["a" /* MessagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_messages_service__["a" /* MessagesService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_8__services_rooms_service__["a" /* RoomsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_rooms_service__["a" /* RoomsService */]) === "function" && _k || Object])
], HomePage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(319);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_services_module__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// New imports to update based on AngularFire2 version 4


var firebaseConfig = {
    apiKey: "AIzaSyCrhPHs2WduPHNofLVkU4a4b1knUGH6gFA",
    authDomain: "spycookie-31a6f.firebaseapp.com",
    databaseURL: "https://spycookie-31a6f.firebaseio.com",
    projectId: "spycookie-31a6f",
    storageBucket: "spycookie-31a6f.appspot.com",
    messagingSenderId: "459704495117"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/admin/admin.module#AdminPageModule', name: 'AdminPage', segment: 'admin', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/choose-category/choose-category.module#ChooseCategoryPageModule', name: 'ChooseCategoryPage', segment: 'choose-category', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/end-game/end-game.module#EndGamePageModule', name: 'EndGamePage', segment: 'end-game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/guess/guess.module#GuessPageModule', name: 'GuessPage', segment: 'guess', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/info/info.module#InfoPageModule', name: 'InfoPage', segment: 'info', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/instructions/instructions.module#InstructionsPageModule', name: 'InstructionsPage', segment: 'instructions', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/lobby/lobby.module#LobbyPageModule', name: 'LobbyPage', segment: 'lobby', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/points-info/points-info.module#PointsInfoPageModule', name: 'PointsInfoPage', segment: 'points-info', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/score/score.module#ScorePageModule', name: 'ScorePage', segment: 'score', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_6__services_services_module__["a" /* ServicesModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormsModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_model__ = __webpack_require__(159);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var RoomModel = (function (_super) {
    __extends(RoomModel, _super);
    function RoomModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RoomModel;
}(__WEBPACK_IMPORTED_MODULE_0__base_model__["a" /* BaseModel */]));

//# sourceMappingURL=room.model.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rooms_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var firebaseConfig = {
    apiKey: "AIzaSyCrhPHs2WduPHNofLVkU4a4b1knUGH6gFA",
    authDomain: "spycookie-31a6f.firebaseapp.com",
    databaseURL: "https://spycookie-31a6f.firebaseio.com",
    projectId: "spycookie-31a6f",
    storageBucket: "spycookie-31a6f.appspot.com",
    messagingSenderId: "459704495117"
};
var ServicesModule = (function () {
    function ServicesModule() {
    }
    return ServicesModule;
}());
ServicesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["L" /* NgModule */])({
        declarations: [],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig)
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__rooms_service__["a" /* RoomsService */],
            __WEBPACK_IMPORTED_MODULE_3__messages_service__["a" /* MessagesService */]
        ],
        exports: []
    })
], ServicesModule);

//# sourceMappingURL=services.module.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, auth) {
        this.afAuth = afAuth;
        this.auth = auth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\mole-app\trunk\src\app\app.html"*/'<ion-nav [root]="rootPage">\n\n <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n\n</ion-nav>\n\n\n'/*ion-inline-end:"C:\mole-app\trunk\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Models_user_model__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthService = AuthService_1 = (function () {
    function AuthService(afAuth, fb, platform, af) {
        this.afAuth = afAuth;
        this.fb = fb;
        this.platform = platform;
        this.af = af;
    }
    AuthService.prototype.clearUser = function () {
        AuthService_1._currentUser = new __WEBPACK_IMPORTED_MODULE_3__Models_user_model__["a" /* UserModel */];
    };
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return AuthService_1._currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "IsDebug", {
        get: function () {
            return AuthService_1.Isdebug;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return this.currentUser != null && this.currentUser.isAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.signInWithFacebook = function () {
        if (this.platform.is('cordova')) {
            this.fb.login(['email', 'public_profile']).then(function (res) {
                var facebookCredential = __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken);
                __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().signInWithCredential(facebookCredential);
            });
        }
        else {
            return this.afAuth.auth
                .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"].FacebookAuthProvider())
                .then(function (res) { return console.log(res); });
        }
    };
    AuthService.prototype.signOut = function () {
        this.fb.logout();
    };
    AuthService.prototype.addGuestUser = function (userName, roomKey, isOwner) {
        var userModel = {
            displayName: userName,
            games: 0,
            totalPoints: 0,
            imageUrl: "assets/geust.png",
            level: "beginner",
            isAuthenticated: false,
            isOwner: isOwner
        };
        var userId = this.af.list("users").push(userModel).key;
        // let usersInRoomKey = this.af.list(`users/${roomKey}`).push(userModel).key;
        //this.af.object(`rooms/${roomKey}/users/key`).set(userId);
        this.af.object("rooms/" + roomKey + "/users/" + userId).set(0);
        userModel.$key = userId;
        AuthService_1._currentUser = userModel;
        this.getPointsInRoom(AuthService_1._currentUser, roomKey).subscribe(function (t) {
            AuthService_1._currentUser.pointsInRoom = t.$value;
        });
        // add the name of the user to room so we can check if the name exists
        this.af.list("rooms/" + roomKey + "/usernames").push(userName);
        // this.getPointsInRoom(AuthService._currentUser, roomKey).subscribe( t=> {
        //     console.log("add guest " + t.pointsinRoom);
        //     AuthService._currentUser.pointsInRoom = t;
        // });
    };
    AuthService.prototype.getUser = function (userKey) {
        return this.af.object("users/" + userKey);
    };
    AuthService.prototype.getPointsInRoom = function (user, roomKey) {
        return this.af.object("rooms/" + roomKey + "/users/" + user.$key);
    };
    AuthService.prototype.activeUser = function (user) {
        var userModel = {
            displayName: user.displayName,
            imageUrl: user.photoURL,
            isAuthenticated: true,
            $key: user.uid,
            totalPoints: 0,
            games: 0,
            level: "beginner",
            isOwner: false
        };
        AuthService_1._currentUser = userModel;
    };
    return AuthService;
}());
AuthService.Isdebug = true;
AuthService = AuthService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], AuthService);

var AuthService_1;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagesService = (function () {
    function MessagesService(afAuth, fb, alertCtrl, platform, af, toastCtrl) {
        this.afAuth = afAuth;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.af = af;
        this.toastCtrl = toastCtrl;
    }
    MessagesService.prototype.showMsg = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    MessagesService.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    return MessagesService;
}());
MessagesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */]])
], MessagesService);

//# sourceMappingURL=messages.service.js.map

/***/ })

},[302]);
//# sourceMappingURL=main.js.map