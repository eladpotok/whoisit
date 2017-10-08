webpackJsonp([3],{

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndGamePageModule", function() { return EndGamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__end_game__ = __webpack_require__(453);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EndGamePageModule = (function () {
    function EndGamePageModule() {
    }
    return EndGamePageModule;
}());
EndGamePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__end_game__["a" /* EndGamePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__end_game__["a" /* EndGamePage */]),
        ],
    })
], EndGamePageModule);

//# sourceMappingURL=end-game.module.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EndGamePage; });
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



var EndGamePage = (function () {
    function EndGamePage(navCtrl, navParams, af) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.usersModel = [];
        this.roomKey = this.navParams.get('roomKey');
        this.roundKey = this.navParams.get('roundKey');
        if (this.roundKey != null) {
            this.af.object("rounds/" + this.roundKey + "/votesCount").set(0);
            this.af.object("rounds/" + this.roundKey + "/votes/dummy").set(true);
        }
        else {
            this.af.list("rounds/").subscribe(function (t) {
                t.forEach(function (room) {
                    if (room.val().roomKey == _this.roomKey) {
                        _this.roomKey = room.val().key;
                        return;
                    }
                });
            });
        }
        // get the users in the current room
        af.list("rooms/" + this.roomKey + "/users").subscribe(function (snapshots) {
            _this.usersModel = [];
            snapshots.forEach(function (snapshot) {
                var userId = snapshot.$key;
                af.object("users/" + userId).subscribe(function (t) {
                    _this.usersModel.push(t);
                });
            });
        });
        // wait till all users will vote
        af.object("rounds/" + this.roundKey + "/isAllVoted").subscribe(function (t) {
            if (t.$value) {
                _this.navCtrl.push('ScorePage', {
                    roundKey: _this.roundKey,
                    roomKey: _this.roomKey
                });
            }
        });
    }
    EndGamePage.prototype.selectUser = function (user) {
        var _this = this;
        var counter = 0;
        var subscribtion = this.af.object("/rounds/" + this.roundKey + "/votes/" + user.$key).subscribe(function (user) {
            counter = user.$value;
            subscribtion.unsubscribe();
            counter++;
            _this.af.object("/rounds/" + _this.roundKey + "/votes/" + user.$key).set(counter);
        });
        //this.navCtrl.push('cat');
    };
    return EndGamePage;
}());
EndGamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-end-game',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\end-game\end-game.html"*/'<!--\n  Generated template for the EndGamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Who\'s the spy?</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n   <ion-list>\n    <ion-item ion-item *ngFor="let item of usersModel" (click)="selectUser(item)">\n      <ion-avatar item-start>\n        <img [src]="item.imageUrl">\n      </ion-avatar>\n      <h2> {{ item.displayName }}</h2>\n    </ion-item>\n  </ion-list> \n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\end-game\end-game.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], EndGamePage);

//# sourceMappingURL=end-game.js.map

/***/ })

});
//# sourceMappingURL=3.js.map