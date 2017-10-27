webpackJsonp([4],{

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyPageModule", function() { return LobbyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lobby__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LobbyPageModule = (function () {
    function LobbyPageModule() {
    }
    return LobbyPageModule;
}());
LobbyPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__lobby__["a" /* LobbyPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__lobby__["a" /* LobbyPage */]),
        ],
    })
], LobbyPageModule);

//# sourceMappingURL=lobby.module.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LobbyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LobbyPage = (function () {
    function LobbyPage(navCtrl, navParams, af, authService, roomService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.authService = authService;
        this.roomService = roomService;
        this.loadingCtrl = loadingCtrl;
        this.usersModel = [];
        // Get thr paramters from the navigation controller
        this.roomKey = this.navParams.get('roomKey');
        // load the users from the room
        this.loadUsers();
        // find the room by the given entry code
        this.findRoom();
        var subscription = this.af.list("rounds/" + this.roomKey + "/").subscribe(function (t) {
            t.forEach(function (r) {
                if (r != null && r.roomKey == _this.roomKey && r.state != "done") {
                    var roundKey_1 = r.$key;
                    subscription.unsubscribe();
                    _this.af.object("rounds/" + _this.roomKey + "/" + roundKey_1 + "/isCategorySelected").subscribe(function (category) {
                        if (category.$value) {
                            _this.dismissLoading();
                            _this.navCtrl.push('GamePage', { roundKey: roundKey_1 });
                        }
                    });
                    _this.af.object("rounds/" + _this.roomKey + "/" + roundKey_1 + "/selectorKey").subscribe(function (selector) {
                        if (selector.$value == _this.authService.currentUser.$key) {
                            _this.navCtrl.push('ChooseCategoryPage', { roundKey: roundKey_1 });
                        }
                        else if (selector.$value != null) {
                            _this.presentLoading();
                        }
                    });
                }
            });
        });
    }
    LobbyPage.prototype.findRoom = function () {
        var _this = this;
        // Get the current room
        this.af.object("/rooms/" + this.roomKey).subscribe(function (t) {
            _this.roomName = t.roomName;
            if (t.owner == _this.authService.currentUser.displayName)
                _this.isOwner = true;
            else {
                _this.roomService.updateUsersInRoom(_this.roomKey);
            }
            _this.entryCode = t.entryCode;
        });
    };
    LobbyPage.prototype.loadUsers = function () {
        var _this = this;
        // get the users in the current room
        this.af.list("rooms/" + this.roomKey + "/users").subscribe(function (snapshots) {
            console.log("enter here");
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
    LobbyPage.prototype.raffleSpy = function () {
        var spyRandNumber = Math.floor(Math.random() * this.usersModel.length);
        this.spyUser = this.usersModel[spyRandNumber].$key;
        this.roomService.setSpy(this.spyUser);
    };
    LobbyPage.prototype.raffleSelector = function () {
        var spyRandNumber = Math.floor(Math.random() * this.usersModel.length);
        this.selectorUserKey = this.usersModel[spyRandNumber].$key;
    };
    LobbyPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        this.loader.present();
    };
    LobbyPage.prototype.dismissLoading = function () {
        if (this.loader != null)
            this.loader.dismiss();
    };
    LobbyPage.prototype.startGame = function () {
        this.roomService.updateUsersInRoom(this.roomKey);
        // raffle spy and category selector  
        this.raffleSelector();
        this.raffleSpy();
        var round = {
            categoryKey: "",
            selectorKey: this.selectorUserKey,
            spyKey: this.spyUser,
            roomKey: this.roomKey,
            secret: 0
        };
        this.af.list("rounds/" + this.roomKey + "/").push(round);
        // Add new room to the db
        this.af.object("rooms/" + this.roomKey + "/isStarted").set(true);
        this.af.object("rooms/" + this.roomKey + "/usersCount").set(this.usersCount);
    };
    LobbyPage.prototype.exit = function () {
        this.af.list("rooms/" + this.roomKey + "/users/").remove(this.authService.currentUser.$key);
        this.navCtrl.push('HomePage');
    };
    LobbyPage.prototype.goSettings = function () {
        this.navCtrl.push('SettingsPage', { roomKey: this.roomKey });
    };
    return LobbyPage;
}());
LobbyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-lobby',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\lobby\lobby.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      <label>   {{ roomName }} - </label>\n      <label class="entryCodeLabel"> {{ entryCode }} </label>\n    </ion-title>\n    <ion-buttons end>\n      <button (click)="goSettings()" class="settingsButton" *ngIf="isOwner">\n        <ion-icon name="md-settings" ></ion-icon>    \n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="body">\n\n  <ion-list no-lines>\n    <ion-item ion-item *ngFor="let item of usersModel" class="cardBody" >\n      <ion-avatar item-start>\n        <img [src]="item.imageUrl">\n      </ion-avatar>\n      <h2> {{ item.displayName }}</h2>\n      <p>{{ item.level }}</p>\n      <h2 item-end > {{ item.pointsInRoom  }} points </h2>\n\n    </ion-item>\n  </ion-list> \n\n  <button ion-button (click)="startGame()" *ngIf="isOwner" class="myButton" >Start !</button>\n\n  <!--<button ion-button (click)="exit()" class="myButton">Exit</button>-->\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\lobby\lobby.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], LobbyPage);

//# sourceMappingURL=lobby.js.map

/***/ })

});
//# sourceMappingURL=4.js.map