webpackJsonp([0],{

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageModule", function() { return GamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(461);
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

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GamePage = (function () {
    function GamePage(navCtrl, navParams, af, authService, roomsService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.authService = authService;
        this.roomsService = roomsService;
        this.roomKey = this.navParams.get('roomKey');
        console.log("1");
        var subscription = this.af.list("rounds/").subscribe(function (round) {
            round.forEach(function (r) {
                if (r.roomKey == _this.roomKey) {
                    _this.roundKey = r.$key;
                    _this.roomsService.setSpy(r.spyKey);
                    console.log("2");
                    _this.af.object("/rounds/" + _this.roundKey + "/categoryName").subscribe(function (t) {
                        console.log("3");
                        _this.af.object("categories/" + t.$value + "/").subscribe(function (cat) {
                            console.log("ctor game " + t.$value);
                            _this.category = cat;
                            subscription.unsubscribe();
                            _this.drawCard();
                        });
                    });
                }
            });
        });
    }
    GamePage.prototype.drawCard = function () {
        if (this.roomsService.getSpy() == this.authService.currentUser.$key) {
            this.drawSpy();
        }
        else {
            this.drawRandomCard();
        }
    };
    GamePage.prototype.drawRandomCard = function () {
        var _this = this;
        this.titleGame = this.category.title;
        this.af.object("rounds/" + this.roundKey + "/secret").subscribe(function (t) {
            _this.photoImage = 'assets/' + _this.titleGame + "/" + t.$value + ".png";
        });
        // set the image as taken
        //this.af.object(`/categories/${this.imageKey}/isTaken`).set(true);
    };
    GamePage.prototype.drawSpy = function () {
        this.photoImage = "assets/spy2.png";
        this.photoTitle = "Spy";
        this.titleGame = this.category.title;
        this.isSpy = true;
    };
    GamePage.prototype.LeaveGame = function () {
        this.navCtrl.push('EndGamePage', {
            roomKey: this.roomKey,
            roundKey: this.roundKey
        });
        //this.af.object(`categories/${this.imageKey}/isTaken`).set(false);
    };
    return GamePage;
}());
GamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-game',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\game\game.html"*/'<!--\n  Generated template for the GamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n \n</ion-header>\n\n\n<ion-content padding class="bodyCategory">\n      <ion-card class="cardback">\n        <img [src]="photoImage" class="photoGame"/>\n        <ion-card-content>\n            <ion-card-title text-align: center>\n                {{ titleGame }}\n            </ion-card-title>\n          <p *ngIf="isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            If you have been caught, you can guess what the subject is.\n          </p>\n          <p *ngIf="!isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            Remember! The spy is listening and can guess what the subject is.\n          </p>\n        </ion-card-content>\n      </ion-card>\n      \n      <button ion-button (click)="LeaveGame()">Vote</button>\n      \n       \n\n</ion-content>\n\n\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\game\game.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]])
], GamePage);

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(10);
var map_1 = __webpack_require__(90);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=0.js.map