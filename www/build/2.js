webpackJsonp([2],{

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyPageModule", function() { return LobbyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lobby__ = __webpack_require__(464);
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

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LobbyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(298);
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
    function LobbyPage(platform, navCtrl, navParams, af, alertCtrl, authService, roomService) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.roomService = roomService;
        this.usersModel = [];
        // Get thr paramters from the navigation controller
        this.roomKey = this.navParams.get('roomKey');
        // get the users in the current room
        af.list("rooms/" + this.roomKey + "/users").subscribe(function (snapshots) {
            _this.usersModel = [];
            _this.usersCount = snapshots.length;
            snapshots.forEach(function (snapshot) {
                var userId = snapshot.$key;
                var points = snapshot.$value;
                af.object("users/" + userId).subscribe(function (t) {
                    t.pointsInRoom = points;
                    _this.usersModel.push(t);
                });
            });
        });
        // Get the current room
        af.object("/rooms/" + this.roomKey).subscribe(function (t) {
            _this.roomName = t.roomName;
            if (t.owner == authService.currentUser.displayName)
                _this.isOwner = true;
            else {
                _this.roomService.updateUsersInRoom(_this.roomKey);
            }
            _this.entryCode = t.entryCode;
        });
        // wait till the selector will select a category
        af.object("rooms/" + this.roomKey + "/isStarted").subscribe(function (t) {
            if (t.$value) {
                _this.af.object("rooms/" + _this.roomKey + "/selector").subscribe(function (selector) {
                    if (selector.$value == authService.currentUser.displayName) {
                        _this.navCtrl.push('ChooseCategoryPage', {
                            roomKey: _this.roomKey,
                            spy: _this.spyUser
                        });
                    }
                    else {
                        af.object("rooms/" + _this.roomKey + "/isCategorySelected").subscribe(function (catSelected) {
                            if (catSelected.$value) {
                                // if(this.selectorUser == authService.currentUser.$key) {
                                // go to the loading game...
                                _this.navCtrl.push('GamePage', {
                                    roomKey: _this.roomKey,
                                    roundKey: _this.selectorUser
                                });
                            }
                        });
                    }
                    // else {
                    // }
                    // }
                });
            }
        });
    }
    LobbyPage.prototype.raffleSpy = function () {
        var spyRandNumber = Math.floor(Math.random() * (this.usersModel.length - 1));
        if (spyRandNumber >= this.usersModel.length)
            spyRandNumber = this.usersModel.length - 1;
        this.spyUser = this.usersModel[spyRandNumber].$key;
        //this.af.object(`/rooms/${this.roomKey}/spy`).set(this.spyUser);
        this.roomService.setSpy(this.spyUser);
    };
    LobbyPage.prototype.raffleSelector = function () {
        var spyRandNumber = Math.floor(Math.random() * (this.usersModel.length - 1));
        if (spyRandNumber >= this.usersModel.length)
            spyRandNumber = this.usersModel.length - 1;
        this.selectorUser = this.usersModel[spyRandNumber].displayName;
        this.af.object("/rooms/" + this.roomKey + "/selector").set(this.selectorUser);
    };
    LobbyPage.prototype.startGame = function () {
        this.roomService.updateUsersInRoom(this.roomKey);
        // raffle spy and category selector  
        this.raffleSelector();
        this.raffleSpy();
        // Add new room to the db
        this.af.object("rooms/" + this.roomKey + "/isStarted").set(true);
        this.af.object("rooms/" + this.roomKey + "/usersCount").set(this.usersCount);
    };
    LobbyPage.prototype.getUserPoints = function (user) {
        this.af.object("/rooms/" + this.roomKey + "/users/" + user.$key).subscribe(function (t) {
            console.log("return value " + t.$value);
            return t.$value;
        });
    };
    return LobbyPage;
}());
LobbyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-lobby',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\lobby\lobby.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      <label>   {{ roomName }} - </label>\n      <label class="entryCodeLabel"> {{ entryCode }} </label>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="body">\n\n  <ion-list no-lines>\n    <ion-item ion-item *ngFor="let item of usersModel" class="cardBody" >\n      <ion-avatar item-start>\n        <img [src]="item.imageUrl">\n      </ion-avatar>\n      <h2> {{ item.displayName }}</h2>\n      <p>{{ item.level }}</p>\n      <h2 item-end > {{ item.pointsInRoom  }} </h2>\n\n    </ion-item>\n  </ion-list> \n\n  <button ion-button (click)="startGame()" *ngIf="isOwner" class="myButton" >Start !</button>\n\n  \n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\lobby\lobby.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]])
], LobbyPage);

//# sourceMappingURL=lobby.js.map

/***/ })

});
//# sourceMappingURL=2.js.map