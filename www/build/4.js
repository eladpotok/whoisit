webpackJsonp([4],{

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyPageModule", function() { return LobbyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lobby__ = __webpack_require__(473);
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__lobby__["a" /* LobbyPage */]),
        ],
    })
], LobbyPageModule);

//# sourceMappingURL=lobby.module.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LobbyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_messages_service__ = __webpack_require__(90);
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
    function LobbyPage(navCtrl, navParams, af, authService, roomService, loadingCtrl, alertCtrl, msgService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.authService = authService;
        this.roomService = roomService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.msgService = msgService;
        console.log("ctor of lobby");
        // Get thr paramters from the navigation controller
        this.roomKey = this.navParams.get('roomKey');
        // find the room by the given entry code
        this.findRoom();
        // load the users from the room
        this.loadUsers();
        // check if the room is closed by the owner
        this.roomService.checkRoomClosed(this.isOwner, function () { _this.navCtrl.popToRoot(); });
    }
    LobbyPage.prototype.ionViewDidEnter = function () {
        // this workaround helps when we leave the page only for settings page
        // and do not want the room to prepare it again.
        if (!this.enterToSettings)
            this.prepareRoom();
        this.enterToSettings = false;
    };
    LobbyPage.prototype.prepareRoom = function () {
        var _this = this;
        var subscription = this.af.list("rounds/" + this.roomKey + "/").subscribe(function (t) {
            t.forEach(function (r) {
                console.log("in foreach");
                if (r != null && r.roomKey == _this.roomKey && r.state != "done") {
                    _this.currentRound = r.$key;
                    subscription.unsubscribe();
                    _this.af.object("rounds/" + _this.roomKey + "/" + _this.currentRound + "/isCategorySelected").subscribe(function (category) {
                        console.log("category selected - changed");
                        if (category.$value) {
                            _this.dismissLoading();
                            _this.navCtrl.push('GamePage', { roundKey: _this.currentRound });
                        }
                    });
                    _this.af.object("rounds/" + _this.roomKey + "/" + _this.currentRound + "/selectorKey").subscribe(function (selector) {
                        if (selector.$value == _this.authService.currentUser.$key) {
                            console.log("selector key - changed");
                            _this.navCtrl.push('ChooseCategoryPage', { roundKey: _this.currentRound, roomKey: _this.roomKey });
                        }
                        else if (selector.$value != null) {
                            _this.presentLoading();
                        }
                    });
                }
            });
        });
    };
    LobbyPage.prototype.findRoom = function () {
        var _this = this;
        // Get the current room
        var subscription = this.af.object("/rooms/" + this.roomKey).subscribe(function (t) {
            _this.roomName = t.roomName;
            if (t.owner == _this.authService.currentUser.displayName)
                _this.isOwner = true;
            else {
                _this.roomService.updateUsersInRoom(_this.roomKey);
            }
            _this.entryCode = t.entryCode;
            if (subscription != null)
                subscription.unsubscribe();
        });
    };
    LobbyPage.prototype.loadUsers = function () {
        var _this = this;
        this.roomService.loadUsers(this.isOwner, this.currentRound, this.roomKey, function () {
            if (_this.navCtrl.getActive().name != "LobbyPage")
                _this.navCtrl.popTo(_this.navCtrl.getByIndex(1));
        });
    };
    LobbyPage.prototype.raffleSpy = function () {
        var spyRandNumber = Math.floor(Math.random() * this.roomService.usersModel.length);
        this.spyUser = this.roomService.usersModel[spyRandNumber].$key;
        this.roomService.setSpy(this.spyUser);
    };
    LobbyPage.prototype.raffleSelector = function () {
        var spyRandNumber = Math.floor(Math.random() * this.roomService.usersModel.length);
        this.selectorUserKey = this.roomService.usersModel[spyRandNumber].$key;
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
        if (this.roomService.usersCount < 4 && !this.authService.IsDebug) {
            this.msgService.showMsg("Sorry", "The round can be executed only for 4 players and above.");
            return;
        }
        console.log("start game - room key" + this.roomKey);
        this.roomService.updateUsersInRoom(this.roomKey);
        // raffle spy and category selector  
        this.raffleSelector();
        this.raffleSpy();
        var round = {
            categoryKey: "",
            selectorKey: this.selectorUserKey,
            spyKey: this.spyUser,
            roomKey: this.roomKey,
            secret: 0,
            votesCount: 0
        };
        this.af.list("rounds/" + this.roomKey + "/").push(round);
        // Add new room to the db
        this.af.object("rooms/" + this.roomKey + "/isStarted").set(true);
        this.af.object("rooms/" + this.roomKey + "/usersCount").set(this.roomService.usersCount);
    };
    LobbyPage.prototype.exit = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Attention?',
            message: 'Are you sure that you want to leave the room?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Leave',
                    handler: function () {
                        _this.leaveRoom();
                    }
                }
            ]
        });
        alert.present();
    };
    LobbyPage.prototype.leaveRoom = function () {
        console.log("leave room from lobby");
        this.roomService.leaveRoom(this.isOwner);
        this.navCtrl.popToRoot();
    };
    LobbyPage.prototype.goSettings = function () {
        this.enterToSettings = true;
        this.navCtrl.push('SettingsPage', { roomKey: this.roomKey });
    };
    return LobbyPage;
}());
LobbyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-lobby',template:/*ion-inline-start:"C:\mole-app\trunk\src\pages\lobby\lobby.html"*/'\n<ion-header class="title">\n\n  <ion-navbar class="title" hideBackButton >\n    <ion-title class="title">\n      <label>   {{ roomName }} - </label>\n      <label class="entryCodeLabel"> {{ entryCode }} </label>\n    </ion-title>\n    <ion-buttons end>\n      <button (click)="goSettings()" class="settingsButton" *ngIf="isOwner">\n        <ion-icon name="md-settings" ></ion-icon>    \n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="body">\n\n  <ion-list no-lines>\n    <ion-item ion-item *ngFor="let item of roomService.usersModel" class="cardBody" >\n      <ion-avatar item-start>\n        <img [src]="item.imageUrl">\n      </ion-avatar>\n      <h2> {{ item.displayName }}</h2>\n      <p>{{ item.level }}</p>\n      \n      <ion-icon item-end name="key" *ngIf="item.isOwner"></ion-icon>\n      <h2 item-end > {{ item.pointsInRoom  }} points </h2>\n    </ion-item>\n  </ion-list> \n\n  <button ion-button (click)="startGame()" *ngIf="isOwner" class="myButton" >Start !</button>\n  <button ion-button (click)="exit()" class="leaveButton" >Leave</button>\n</ion-content>\n'/*ion-inline-end:"C:\mole-app\trunk\src\pages\lobby\lobby.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__services_messages_service__["a" /* MessagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_messages_service__["a" /* MessagesService */]) === "function" && _h || Object])
], LobbyPage);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=lobby.js.map

/***/ })

});
//# sourceMappingURL=4.js.map