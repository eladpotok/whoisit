webpackJsonp([6],{

/***/ 163:
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
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/choose-category/choose-category.module": [
		453,
		5
	],
	"../pages/end-game/end-game.module": [
		454,
		4
	],
	"../pages/game/game.module": [
		455,
		0
	],
	"../pages/guess/guess.module": [
		456,
		3
	],
	"../pages/lobby/lobby.module": [
		457,
		2
	],
	"../pages/score/score.module": [
		458,
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
webpackAsyncContext.id = 204;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 255:
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

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_user_model__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(89);
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
    function HomePage(navCtrl, afAuth, af, fb, platform, alertCtrl, authService) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.af = af;
        this.fb = fb;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_2__Models_user_model__["a" /* UserModel */];
        this.waitForRegistration();
        //this.isUserAuthorized = false;
        this.operation = "openRoom";
        this.isOpenRoomSelected = true;
        //this.createCategories();
    }
    HomePage.prototype.createCategories = function () {
        var mem1 = {
            title: "Charmander",
            url: "assets/Pokemon/1.png",
        };
        var mem2 = {
            title: "Bulbasaur",
            url: "assets/Pokemon/2.png"
        };
        var mem3 = {
            title: "Squirtle",
            url: "assets/Pokemon/3.png"
        };
        var members = [];
        members.push(mem1);
        members.push(mem2);
        members.push(mem3);
        var category1 = {
            title: "Pokemon",
            url: "assets/pokemonIcon.png",
            description: "Catch'em all!",
            members: members
        };
        var category2 = {
            title: "Movies",
            url: "assets/moviesIcon.png",
            description: "Did you watch it?!",
            members: []
        };
        var category3 = {
            title: "Locations",
            url: "assets/locationIcon.png",
            description: "What dould you take to...?",
            members: []
        };
        var category4 = {
            title: "Food",
            url: "assets/foodIcon.png",
            description: "Yammmm....",
            members: []
        };
        var category5 = {
            title: "Celebs",
            url: "assets/celebIcon.png",
            description: "I know him!",
            members: []
        };
        this.af.list("categories/").push(category1);
        this.af.list("categories/").push(category2);
        this.af.list("categories/").push(category3);
        this.af.list("categories/").push(category4);
        this.af.list("categories/").push(category5);
    };
    HomePage.prototype.waitForRegistration = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.authService.clearUser();
                return;
            }
            _this.authService.activeUser(user);
            if (_this.authService.isAuthenticated) {
                _this.currentUser = _this.authService.currentUser;
            }
        });
    };
    HomePage.prototype.openRoomSubmit = function () {
        if (this.roomName == null ||
            this.currentUser.displayName == null) {
            this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
            return;
        }
        var roomKey = this.createRoom();
        this.addUserToRoom(roomKey);
    };
    HomePage.prototype.createRoom = function () {
        var roomModel = {
            owner: this.currentUser.displayName,
            roomName: this.roomName,
            categoryName: "empty",
            entryCode: this.generateCode(),
            isCategorySelected: false,
            users: [],
            spy: ""
        };
        var roomKey = this.af.list("/rooms").push(roomModel).key;
        return roomKey;
    };
    HomePage.prototype.generateCode = function () {
        var codePool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var code = "";
        for (var i = 0; i < 4; i++) {
            code += codePool.charAt(Math.random() * codePool.length);
        }
        return code;
    };
    HomePage.prototype.addUserToRoom = function (roomKey) {
        var _this = this;
        if (!this.authService.isAuthenticated)
            this.authService.addGuestUser(this.currentUser.displayName, roomKey);
        else {
            this.af.object("rooms/" + roomKey + "/users/" + this.authService.currentUser.$key).set(0);
            this.authService.getPointsInRoom(this.currentUser, roomKey).subscribe(function (t) {
                _this.currentUser.pointsInRoom = t.$value;
            });
        }
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
    HomePage.prototype.joinRoomSubmit = function () {
        var _this = this;
        if (this.currentUser.displayName == null ||
            this.roomEntryCode == null) {
            this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
            return;
        }
        var roomFound = false;
        var subscription = this.af.list('/rooms', { preserveSnapshot: true }).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                if (snapshot.val().entryCode == _this.roomEntryCode) {
                    roomFound = true;
                    if (!snapshot.val().isStarted) {
                        var sub_1 = _this.af.list("rooms/" + snapshot.key + "/users", { preserveSnapshot: true }).subscribe(function (t) {
                            console.log("enter " + snapshot.key);
                            t.forEach(function (u) {
                                if (u != null) {
                                    console.log("enter 2 " + u.key);
                                    _this.af.object("users/" + u.key).subscribe(function (user) {
                                        if (user.displayName == _this.currentUser.displayName) {
                                            _this.showMsg("Sorry", "The given name is already exists in the room");
                                            sub_1.unsubscribe();
                                            return;
                                        }
                                        else {
                                            _this.addUserToRoom(snapshot.key);
                                            sub_1.unsubscribe();
                                            return;
                                        }
                                    });
                                }
                            });
                        });
                    }
                    else {
                        _this.showMsg("Sorry", "The room is in during the game");
                    }
                    subscription.unsubscribe();
                }
            });
            if (!roomFound) {
                _this.showMsg("Room does not exist", "The key which is given is not exist!");
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
    HomePage.prototype.showMsg = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.signInWithFacebook = function () {
        this.authService.signInWithFacebook();
        this.currentUser = this.authService.currentUser;
    };
    HomePage.prototype.signOut = function () {
        this.authService.signOut();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\home\home.html"*/'\n\n\n<ion-content class="body">\n\n<div>\n  <ion-segment [(ngModel)]="operation" class="operationItem">\n    <ion-segment-button value="openRoom" (click)="openRoom()" class="text-foreground">\n      Open Room\n    </ion-segment-button>\n    <ion-segment-button value="joinRoom" (click)="joinRoom()" class="text-foreground">\n      Join Room\n    </ion-segment-button>\n  </ion-segment>\n</div>\n\n<div [ngSwitch]="operation" ngClass="middle-vertical">\n  <ion-list *ngSwitchCase="\'openRoom\'" >\n\n    <ion-item  >\n      <ion-label fixed color="darkBlack">Username</ion-label>\n      <ion-input [disabled]="currentUser.isAuthenticated" type="text" value="" class="text-foreground"  [(ngModel)]="currentUser.displayName"></ion-input>\n    </ion-item>\n\n    <ion-item >\n      <ion-label fixed color="darkBlack" >Room Name</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="roomName" class="text-foreground" ></ion-input>\n    </ion-item> \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'joinRoom\'" (click)="joinRoom()">\n    <ion-item>\n      <ion-label fixed color="darkBlack" >Username</ion-label>\n      <ion-input type="text" value="" [disabled]="isUserAuthorized" [(ngModel)]="currentUser.displayName" class="text-foreground" ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed color="darkBlack" >Entry Code</ion-label>\n      <ion-input type="text" value=""  [(ngModel)]="roomEntryCode" class="text-foreground" ></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <button ion-button color="dark" round icon-start class="goButton" (click)="submitRoom()">\n       Play \n  </button>\n  <button ion-button color="dark" round icon-start class="goButton" (click)="signInWithFacebook()" *ngIf="!isUserAuthorized">\n       Sign with FaceBook \n  </button>\n    <button ion-button color="dark" round icon-start class="goButton" (click)="signOut()" *ngIf="isUserAuthorized">\n       Logout \n  </button>\n\n <ion-item ion-item no-lines ngClass="profileCard" *ngIf="isUserAuthorized">\n      <ion-avatar item-start >\n        <img [src]="photoUrl" ngClass="photo">\n      </ion-avatar>\n      <h2 > Hello {{ displayName }}</h2>\n      <p>Ugh. As if.</p>\n    </ion-item>\n</div>\n\n</ion-content>\n\n\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_room_model__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(84);
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
    function RoomsService(afAuth, fb, platform, af) {
        this.afAuth = afAuth;
        this.fb = fb;
        this.platform = platform;
        this.af = af;
    }
    Object.defineProperty(RoomsService.prototype, "currentRoom", {
        get: function () {
            return RoomsService_1._currentRooms;
        },
        enumerable: true,
        configurable: true
    });
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
        RoomsService_1._currentRooms.spy = spy;
    };
    RoomsService.prototype.getSpy = function () {
        return RoomsService_1._currentRooms.spy;
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
        if (RoomsService_1._currentRooms == null) {
            RoomsService_1._currentRooms = new __WEBPACK_IMPORTED_MODULE_2__Models_room_model__["a" /* RoomModel */];
            RoomsService_1._currentRooms.users = [];
            this.af.object("rooms/" + roomKey).subscribe(function (t) {
                RoomsService_1._currentRooms.$key = t.$key;
                RoomsService_1._currentRooms.categoryName = t.categoryName;
                RoomsService_1._currentRooms.roomName = t.roomName;
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
        }
    };
    return RoomsService;
}());
RoomsService = RoomsService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], RoomsService);

var RoomsService_1;
//# sourceMappingURL=rooms.service.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(316);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_services_module__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(66);
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
                    { loadChildren: '../pages/choose-category/choose-category.module#ChooseCategoryPageModule', name: 'ChooseCategoryPage', segment: 'choose-category', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/end-game/end-game.module#EndGamePageModule', name: 'EndGamePage', segment: 'end-game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/guess/guess.module#GuessPageModule', name: 'GuessPage', segment: 'guess', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/lobby/lobby.module#LobbyPageModule', name: 'LobbyPage', segment: 'lobby', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/score/score.module#ScorePageModule', name: 'ScorePage', segment: 'score', priority: 'low', defaultHistory: [] }
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

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_model__ = __webpack_require__(255);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rooms_service__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["L" /* NgModule */])({
        declarations: [],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig)
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__rooms_service__["a" /* RoomsService */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(297);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\app\app.html"*/'<ion-nav [root]="rootPage">\n\n <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n\n</ion-nav>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_model__ = __webpack_require__(255);
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

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(84);
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
        // afAuth.authState.subscribe((user: firebase.User) => {
        // if (!user) {
        //     AuthService._currentUser = null;
        //     return;
        // }
        //     this.activeUser(user); 
        // });
    }
    AuthService.prototype.clearUser = function () {
        AuthService_1._currentUser = null;
    };
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return AuthService_1._currentUser;
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
        this.afAuth.auth.signOut();
    };
    AuthService.prototype.addGuestUser = function (userName, roomKey) {
        var userModel = {
            displayName: userName,
            games: 0,
            totalPoints: 0,
            imageUrl: "assets/geust.png",
            level: "beginner",
            isAuthenticated: false
        };
        var userId = this.af.list("users").push(userModel).key;
        // let usersInRoomKey = this.af.list(`users/${roomKey}`).push(userModel).key;
        //this.af.object(`rooms/${roomKey}/users/key`).set(userId);
        this.af.object("rooms/" + roomKey + "/users/" + userId).set(0);
        userModel.$key = userId;
        AuthService_1._currentUser = userModel;
        this.getPointsInRoom(AuthService_1._currentUser, roomKey).subscribe(function (t) {
            console.log("add guest " + t.$value);
            AuthService_1._currentUser.pointsInRoom = t.$value;
        });
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
            level: "beginner"
        };
        AuthService_1._currentUser = userModel;
    };
    return AuthService;
}());
AuthService = AuthService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], AuthService);

var AuthService_1;
//# sourceMappingURL=auth.service.js.map

/***/ })

},[299]);
//# sourceMappingURL=main.js.map