webpackJsonp([0],{

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageModule", function() { return GamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(470);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { ComponentsModule } from '../../components/components.module'
var GamePageModule = (function () {
    function GamePageModule() {
    }
    return GamePageModule;
}());
GamePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__game__["a" /* GamePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__game__["a" /* GamePage */]),
        ],
    })
], GamePageModule);

//# sourceMappingURL=game.module.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_messages_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GamePage = (function () {
    function GamePage(navCtrl, navParams, af, authService, roomsService, cd, platform, alertCtrl, loadingCtrl, viewCtrl, msgService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.authService = authService;
        this.roomsService = roomsService;
        this.cd = cd;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.msgService = msgService;
        this.second = 0;
        this.secLabel = "0";
        this.roundKey = this.navParams.get('roundKey');
        console.log("roundkey" + this.roundKey);
        var subscription = this.af.object("rounds/" + roomsService.currentRoom.$key + "/" + this.roundKey).subscribe(function (round) {
            if (round.spyKey == _this.authService.currentUser.$key) {
                _this.drawSpy();
                subscription.unsubscribe();
            }
            else {
                _this.drawRandomCard(round.secret, round.categoryKey);
                subscription.unsubscribe();
            }
            console.log("set spy " + round.spyKey);
            // set the spy so we could know him in the future
            _this.roomsService.setSpy(round.spyKey);
        });
        this.af.object("/settings/" + roomsService.currentRoom.settingsKey).subscribe(function (set) {
            _this.min = set.timeElapsed;
        });
        this.id = setInterval(function () {
            if (_this.second == 0) {
                _this.second = 59;
                _this.secLabel = _this.second.toString();
                _this.min--;
            }
            else {
                _this.second--;
                if (_this.second <= 9 && _this.second >= 0) {
                    _this.secLabel = "0" + _this.second;
                }
                else {
                    _this.secLabel = _this.second.toString();
                }
            }
            if (_this.second == 30 && _this.min == 0)
                _this.lastSeconds = true;
            if ((_this.second == 0 && _this.min == 0) || _this.min < 0) {
                _this.LeaveGame();
            }
            cd.markForCheck();
        }, 1000);
    }
    GamePage.prototype.ionViewWillLeave = function () {
        clearInterval(this.id);
    };
    GamePage.prototype.addPointsToSpy = function (spyState) {
        var points = 0;
        switch (spyState) {
            case "win":
                points = 5;
                break;
            case "semi-win":
                points = 3;
                break;
        }
        this.authService.currentUser.pointsInRoom += points;
        this.af.object("/rooms/" + this.roomsService.currentRoom.$key + "/users/" + this.authService.currentUser.$key).set(this.authService.currentUser.pointsInRoom);
    };
    GamePage.prototype.drawRandomCard = function (subject, categoryKey) {
        var _this = this;
        this.af.object("categories/" + categoryKey + "/").subscribe(function (category) {
            var catModel = category;
            _this.categoryTitle = catModel.title;
            _this.photoImage = catModel.members[subject].url;
            _this.subjectTitle = catModel.members[subject].title;
        });
    };
    GamePage.prototype.drawSpy = function () {
        var _this = this;
        this.photoImage = "assets/spy2.png";
        this.subjectTitle = "Mole";
        this.isSpy = true;
        // wait till other users will vote
        if (this.isSpy) {
            this.af.object("rounds/" + this.roomsService.currentRoom.$key + "/" + this.roundKey + "/spyState").subscribe(function (spy) {
                console.log("the state is " + spy.$value);
                if (spy.$value == "found") {
                    _this.dismissLoading();
                    // go to guess subject page
                    clearInterval(_this.id);
                    _this.navCtrl.push("GuessPage", { roundKey: _this.roundKey });
                }
                else if (spy.$value == "win" || spy.$value == "semi-win" || spy.$value == "lose") {
                    _this.dismissLoading();
                    clearInterval(_this.id);
                    _this.addPointsToSpy(spy.$value);
                    // go to score page 
                    _this.navCtrl.push('ScorePage', { roundKey: _this.roundKey, spyState: spy.$value });
                }
                else if (spy.$value == "damaged") {
                    clearInterval(_this.id);
                    _this.dismissLoading();
                    _this.msgService.showMsg("Sorry", "One of the players left the room, you are directed to the room");
                    _this.navCtrl.popTo("LobbyPage");
                }
            });
        }
    };
    GamePage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Wait till all players vote...",
        });
        this.loader.present();
    };
    GamePage.prototype.dismissLoading = function () {
        if (this.loader != null)
            this.loader.dismiss();
    };
    GamePage.prototype.LeaveGame = function () {
        clearInterval(this.id);
        if (!this.isSpy) {
            this.navCtrl.push('EndGamePage', {
                roundKey: this.roundKey
            });
        }
        else {
            this.presentLoading();
        }
    };
    return GamePage;
}());
GamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-game',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\game\game.html"*/'<!--\n  Generated template for the GamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n \n</ion-header>\n\n\n<ion-content padding class="bodyCategoryEmpty">\n      <ion-card class="cardback">\n        <img [src]="photoImage" class="photoGame"/>\n        <ion-card-content>\n            <ion-card-title text-align: center>\n                {{ subjectTitle }}\n            </ion-card-title>\n          <p *ngIf="isSpy">\n            Be aware for the questions and try to obsorb any information you can.\n            If you have been caught, you can guess what the subject is.\n          </p>\n          <p *ngIf="!isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            Remember! The mole is listening and can guess what the subject is.\n          </p>\n        </ion-card-content>\n\n        \n      </ion-card>\n      <ion-item class="timerItem" no-lines>\n          <ion-icon name="clock" item-start class="iconTimer" ></ion-icon>\n\n          <label [ngClass]="{\'timer\': !lastSeconds,\n                            \'timerRed\': lastSeconds}"> Time left {{min}} : {{secLabel}} </label>\n\n          <button ion-button color="light"  item-end icon-left (click)="LeaveGame()" *ngIf="!isSpy">\n            <ion-icon name="hand"></ion-icon>\n              Vote\n          </button>\n      </ion-item>\n      \n      \n\n</ion-content>\n\n\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\game\game.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_5__services_messages_service__["a" /* MessagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_messages_service__["a" /* MessagesService */]) === "function" && _l || Object])
], GamePage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=game.js.map

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(10);
var map_1 = __webpack_require__(90);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=0.js.map