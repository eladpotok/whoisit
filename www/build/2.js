webpackJsonp([2],{

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyPageModule", function() { return LobbyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lobby__ = __webpack_require__(456);
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

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LobbyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(152);
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
    function LobbyPage(platform, navCtrl, navParams, af, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.usersModel = [];
        // Get thr paramters from the navigation controller
        this.roomKey = this.navParams.get('roomKey');
        this.userName = this.navParams.get('userName');
        this.userItems = af.list("rooms/" + this.roomKey + "/users");
        // get the users in the current room
        af.list("rooms/" + this.roomKey + "/users").subscribe(function (snapshots) {
            _this.usersModel = [];
            _this.usersCount = snapshots.length;
            snapshots.forEach(function (snapshot) {
                var userId = snapshot.$key;
                af.object("users/" + userId).subscribe(function (t) {
                    _this.usersModel.push(t);
                });
            });
        });
        // Get the current room
        af.object("/rooms/" + this.roomKey).subscribe(function (t) {
            _this.roomName = t.roomName;
            if (t.owner == _this.userName)
                _this.isOwner = true;
            _this.entryCode = t.entryCode;
        });
        af.object("rooms/" + this.roomKey + "/isStarted").subscribe(function (t) {
            console.log("enter");
            if (t.$value) {
                _this.af.object("rooms/" + _this.roomKey + "/selector").subscribe(function (selector) {
                    if (selector.$value == _this.userName) {
                        _this.navCtrl.push('ChooseCategoryPage', {
                            roomKey: _this.roomKey,
                            userName: _this.userName
                        });
                    }
                });
            }
            else {
                af.object("rooms/" + _this.roomKey + "/isCategorySelected").subscribe(function (catSelected) {
                    if (catSelected.$value) {
                        // go to the loading game...
                        _this.navCtrl.push('GamePage', {
                            roomKey: _this.roomKey,
                            userName: _this.userName,
                            selectorUser: _this.selectorUser
                        });
                    }
                });
            }
        });
    }
    LobbyPage.prototype.raffleSpy = function () {
        var spyRandNumber = Math.floor(Math.random() * (this.usersModel.length - 1));
        if (spyRandNumber >= this.usersModel.length)
            spyRandNumber = this.usersModel.length - 1;
        this.spyUser = this.usersModel[spyRandNumber].displayName;
        this.af.object("/rooms/" + this.roomKey + "/spy").set(this.spyUser);
    };
    LobbyPage.prototype.raffleSelector = function () {
        var spyRandNumber = Math.floor(Math.random() * (this.usersModel.length - 1));
        if (spyRandNumber >= this.usersModel.length)
            spyRandNumber = this.usersModel.length - 1;
        this.selectorUser = this.usersModel[spyRandNumber].displayName;
        this.af.object("/rooms/" + this.roomKey + "/selector").set(this.selectorUser);
    };
    LobbyPage.prototype.startGame = function () {
        // raffle spy and category selector  
        this.raffleSelector();
        this.raffleSpy();
        // Add new room to the db
        this.af.object("rooms/" + this.roomKey + "/isStarted").set(true);
        this.af.object("rooms/" + this.roomKey + "/usersCount").set(this.usersCount);
    };
    return LobbyPage;
}());
LobbyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-lobby',template:/*ion-inline-start:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\pages\lobby\lobby.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      <label>   {{ roomName }} - </label>\n      <label class="entryCodeLabel"> {{ entryCode }} </label>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="body">\n\n  <ion-list no-lines>\n    <ion-item ion-item *ngFor="let item of usersModel" class="cardBody" >\n      <ion-avatar item-start>\n        <img [src]="item.imageUrl">\n      </ion-avatar>\n      <h2> {{ item.displayName }}</h2>\n      <p>{{ item.level }}</p>\n    </ion-item>\n  </ion-list> \n\n  <button ion-button (click)="startGame()" *ngIf="isOwner" class="myButton" >Start !</button>\n\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\pages\lobby\lobby.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], LobbyPage);

//# sourceMappingURL=lobby.js.map

/***/ })

});
//# sourceMappingURL=2.js.map