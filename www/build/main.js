webpackJsonp([5],{

/***/ 160:
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
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/choose-category/choose-category.module": [
		447,
		4
	],
	"../pages/end-game/end-game.module": [
		448,
		3
	],
	"../pages/game/game.module": [
		449,
		0
	],
	"../pages/lobby/lobby.module": [
		450,
		2
	],
	"../pages/score/score.module": [
		451,
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
webpackAsyncContext.id = 201;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
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
    function HomePage(navCtrl, afAuth, af, fb, platform, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.af = af;
        this.fb = fb;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.isUserAuthorized = false;
        this.operation = "openRoom";
        this.isOpenRoomSelected = true;
        // let spy: CardModel = {
        //   title: "Spy",
        //   link: "https://firebasestorage.googleapis.com/v0/b/spycookie-31a6f.appspot.com/o/category%2Fspy.png?alt=media&token=8cf47740-c7a2-4f51-a961-eb9145f8066d",
        //   category: "All"
        // }
        // TODO: check if its raised with any user which sign in.
        // Maybe I should detect it by its uid.
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.displayName = null;
                return;
            }
            _this.activeUser(user);
        });
    }
    // TODO: need to contain only one object "user" instead of all of its fields.
    HomePage.prototype.activeUser = function (user) {
        this.userName = user.displayName;
        this.displayName = user.displayName;
        this.photoUrl = user.photoURL;
        this.isUserAuthorized = true;
        this.userId = user.uid;
    };
    HomePage.prototype.openRoomSubmit = function () {
        if (this.roomName == null ||
            this.userName == null) {
            this.showMsg("Wrong parameter!", "One of the given paramter is incorrect");
            return;
        }
        var roomKey = this.createRoom();
        this.addUserToRoom(roomKey);
    };
    HomePage.prototype.createRoom = function () {
        var roomModel = {
            owner: this.userName,
            roomName: this.roomName,
            categoryName: "empty",
            entryCode: this.roomName.substring(0, 4),
        };
        var roomKey = this.af.list("/rooms").push(roomModel).key;
        return roomKey;
    };
    HomePage.prototype.addUserToRoom = function (roomKey) {
        var userId = this.userId;
        if (!this.isUserAuthorized) {
            var userModel = {
                displayName: this.userName,
                games: 0,
                totalPoints: 0,
                imageUrl: "assets/geust.png",
                level: "beginner"
            };
            userId = this.af.list("users").push(userModel).key;
        }
        // let usersInRoomKey = this.af.list(`users/${roomKey}`).push(userModel).key;
        //this.af.object(`rooms/${roomKey}/users/key`).set(userId);
        this.af.object("rooms/" + roomKey + "/users/" + userId).set(true);
        this.navCtrl.push('LobbyPage', {
            roomKey: roomKey,
            userName: this.userName
        });
    };
    HomePage.prototype.openRoom = function () {
        this.isOpenRoomSelected = true;
    };
    HomePage.prototype.joinRoomSubmit = function () {
        var _this = this;
        if (this.userName == null ||
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
                        _this.addUserToRoom(snapshot.key);
                        subscription.unsubscribe();
                        return;
                    }
                    else {
                        _this.showMsg("Sorry", "The room is in during the game");
                    }
                    subscription.unsubscribe();
                }
            });
            if (!roomFound)
                _this.showMsg("Room does not exist", "The key which is given is not exist!");
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
        if (this.platform.is('cordova')) {
            this.fb.login(['email', 'public_profile']).then(function (res) {
                var facebookCredential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken);
                __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().signInWithCredential(facebookCredential);
            });
        }
        else {
            return this.afAuth.auth
                .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider())
                .then(function (res) { return console.log(res); });
        }
    };
    HomePage.prototype.signOut = function () {
        this.afAuth.auth.signOut();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\pages\home\home.html"*/'\n\n\n<ion-content class="body">\n\n<div>\n  <ion-segment [(ngModel)]="operation" class="operationItem">\n    <ion-segment-button value="openRoom" (click)="openRoom()" class="text-foreground">\n      Open Room\n    </ion-segment-button>\n    <ion-segment-button value="joinRoom" (click)="joinRoom()" class="text-foreground">\n      Join Room\n    </ion-segment-button>\n  </ion-segment>\n</div>\n\n<div [ngSwitch]="operation" ngClass="middle-vertical">\n  <ion-list *ngSwitchCase="\'openRoom\'" >\n\n    <ion-item  >\n      <ion-label fixed color="darkBlack">Username</ion-label>\n      <ion-input [disabled]="isUserAuthorized" type="text" value="" class="text-foreground"  [(ngModel)]="userName"></ion-input>\n    </ion-item>\n\n    <ion-item >\n      <ion-label fixed color="darkBlack" >Room Name</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="roomName" class="text-foreground" ></ion-input>\n    </ion-item> \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'joinRoom\'" (click)="joinRoom()">\n    <ion-item>\n      <ion-label fixed color="darkBlack" >Username</ion-label>\n      <ion-input type="text" value="" [disabled]="isUserAuthorized" [(ngModel)]="userName" class="text-foreground" ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed color="darkBlack" >Entry Code</ion-label>\n      <ion-input type="text" value=""  [(ngModel)]="roomEntryCode" class="text-foreground" ></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <button ion-button color="dark" round icon-start class="goButton" (click)="submitRoom()">\n       Play \n  </button>\n  <button ion-button color="dark" round icon-start class="goButton" (click)="signInWithFacebook()" *ngIf="!isUserAuthorized">\n       Sign with FaceBook \n  </button>\n    <button ion-button color="dark" round icon-start class="goButton" (click)="signOut()" *ngIf="isUserAuthorized">\n       Logout \n  </button>\n\n <ion-item ion-item no-lines ngClass="profileCard" *ngIf="isUserAuthorized">\n      <ion-avatar item-start >\n        <img [src]="photoUrl" ngClass="photo">\n      </ion-avatar>\n      <h2 > Hello {{ displayName }}</h2>\n      <p>Ugh. As if.</p>\n    </ion-item>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(313);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__(284);
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
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/choose-category/choose-category.module#ChooseCategoryPageModule', name: 'ChooseCategoryPage', segment: 'choose-category', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/end-game/end-game.module#EndGamePageModule', name: 'EndGamePage', segment: 'end-game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/lobby/lobby.module#LobbyPageModule', name: 'LobbyPage', segment: 'lobby', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/score/score.module#ScorePageModule', name: 'ScorePage', segment: 'score', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
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

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(283);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\app\app.html"*/'<ion-nav [root]="rootPage">\n\n <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n\n</ion-nav>\n'/*ion-inline-end:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[296]);
//# sourceMappingURL=main.js.map