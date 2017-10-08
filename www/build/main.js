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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(458);
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
        //this.isUserAuthorized = false;
        this.operation = "openRoom";
        this.isOpenRoomSelected = true;
    }
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
            isCategorySelected: false,
            users: []
        };
        var roomKey = this.af.list("/rooms").push(roomModel).key;
        return roomKey;
    };
    HomePage.prototype.addUserToRoom = function (roomKey) {
        if (!this.authService.isAuthenticated)
            this.authService.addGuestUser(this.userName, roomKey);
        this.navCtrl.push('LobbyPage', {
            roomKey: roomKey
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
        this.authService.signInWithFacebook();
    };
    HomePage.prototype.signOut = function () {
        this.authService.signOut();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\home\home.html"*/'\n\n\n<ion-content class="body">\n\n<div>\n  <ion-segment [(ngModel)]="operation" class="operationItem">\n    <ion-segment-button value="openRoom" (click)="openRoom()" class="text-foreground">\n      Open Room\n    </ion-segment-button>\n    <ion-segment-button value="joinRoom" (click)="joinRoom()" class="text-foreground">\n      Join Room\n    </ion-segment-button>\n  </ion-segment>\n</div>\n\n<div [ngSwitch]="operation" ngClass="middle-vertical">\n  <ion-list *ngSwitchCase="\'openRoom\'" >\n\n    <ion-item  >\n      <ion-label fixed color="darkBlack">Username</ion-label>\n      <ion-input [disabled]="isUserAuthorized" type="text" value="" class="text-foreground"  [(ngModel)]="userName"></ion-input>\n    </ion-item>\n\n    <ion-item >\n      <ion-label fixed color="darkBlack" >Room Name</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="roomName" class="text-foreground" ></ion-input>\n    </ion-item> \n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'joinRoom\'" (click)="joinRoom()">\n    <ion-item>\n      <ion-label fixed color="darkBlack" >Username</ion-label>\n      <ion-input type="text" value="" [disabled]="isUserAuthorized" [(ngModel)]="userName" class="text-foreground" ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed color="darkBlack" >Entry Code</ion-label>\n      <ion-input type="text" value=""  [(ngModel)]="roomEntryCode" class="text-foreground" ></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <button ion-button color="dark" round icon-start class="goButton" (click)="submitRoom()">\n       Play \n  </button>\n  <button ion-button color="dark" round icon-start class="goButton" (click)="signInWithFacebook()" *ngIf="!isUserAuthorized">\n       Sign with FaceBook \n  </button>\n    <button ion-button color="dark" round icon-start class="goButton" (click)="signOut()" *ngIf="isUserAuthorized">\n       Logout \n  </button>\n\n <ion-item ion-item no-lines ngClass="profileCard" *ngIf="isUserAuthorized">\n      <ion-avatar item-start >\n        <img [src]="photoUrl" ngClass="photo">\n      </ion-avatar>\n      <h2 > Hello {{ displayName }}</h2>\n      <p>Ugh. As if.</p>\n    </ion-item>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]) === "function" && _g || Object])
], HomePage);

var _a, _b, _c, _d, _e, _f, _g;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_services_module__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(284);
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
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/choose-category/choose-category.module#ChooseCategoryPageModule', name: 'ChooseCategoryPage', segment: 'choose-category', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/end-game/end-game.module#EndGamePageModule', name: 'EndGamePage', segment: 'end-game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/lobby/lobby.module#LobbyPageModule', name: 'LobbyPage', segment: 'lobby', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/score/score.module#ScorePageModule', name: 'ScorePage', segment: 'score', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_6__services_services_module__["a" /* ServicesModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\app\app.html"*/'<ion-nav [root]="rootPage">\n\n <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n\n</ion-nav>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(282);
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
        var _this = this;
        this.afAuth = afAuth;
        this.fb = fb;
        this.platform = platform;
        this.af = af;
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                AuthService_1._currentUser = null;
                return;
            }
            _this.activeUser(user);
        });
    }
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return AuthService_1._currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return this._isAuthenticated;
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
        this._isAuthenticated = true;
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
        this.af.object("rooms/" + roomKey + "/users/" + userId).set(true);
        userModel.$key = userId;
        AuthService_1._currentUser = userModel;
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], AuthService);

var AuthService_1;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rooms_service__ = __webpack_require__(460);
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

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_room_model__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(282);
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
    RoomsService.prototype.getUsersFromRoom = function () {
        return RoomsService_1._currentRooms.users;
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
                    _this.af.object("users/" + userKey).subscribe(function (userDetail) {
                        RoomsService_1._currentRooms.users.push(userDetail);
                    });
                });
            });
        }
    };
    return RoomsService;
}());
RoomsService = RoomsService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _d || Object])
], RoomsService);

var RoomsService_1, _a, _b, _c, _d;
//# sourceMappingURL=rooms.service.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_model__ = __webpack_require__(462);
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

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseModel; });
var BaseModel = (function () {
    function BaseModel() {
    }
    return BaseModel;
}());

//# sourceMappingURL=base.model.js.map

/***/ })

},[296]);
//# sourceMappingURL=main.js.map