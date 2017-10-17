webpackJsonp([0],{

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageModule", function() { return GamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(456);
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

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(457);
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







var GamePage = (function () {
    function GamePage(navCtrl, navParams, af, authService, roomsService, cd) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.authService = authService;
        this.roomsService = roomsService;
        this.cd = cd;
        this.second = 0;
        this.min = 1;
        this.roundKey = this.navParams.get('roundKey');
        var subscription = this.af.object("rounds/" + roomsService.currentRoom.$key + "/" + this.roundKey).subscribe(function (round) {
            if (round.spyKey == _this.authService.currentUser.$key) {
                _this.drawSpy();
                subscription.unsubscribe();
            }
            else {
                _this.drawRandomCard(round.secret, round.categoryKey);
                subscription.unsubscribe();
            }
            // set the spy so we could know him in the future
            _this.roomsService.setSpy(round.spyKey);
        });
        this.id = setInterval(function () {
            if (_this.second == 0) {
                _this.second = 59;
                _this.min--;
            }
            else {
                _this.second--;
            }
            if (_this.second == 30 && _this.min == 0)
                _this.lastSeconds = true;
            console.log("hello");
            if (_this.second == 0 && _this.min == 0) {
                clearInterval(_this.id);
                _this.LeaveGame();
            }
            cd.markForCheck();
        }, 1000);
    }
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
        this.photoImage = "assets/spy2.png";
        this.subjectTitle = "Spy";
        this.isSpy = true;
    };
    GamePage.prototype.LeaveGame = function () {
        this.navCtrl.push('EndGamePage', {
            roundKey: this.roundKey
        });
    };
    return GamePage;
}());
GamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-game',template:/*ion-inline-start:"C:\clone2\trunk\src\pages\game\game.html"*/'<!--\n  Generated template for the GamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n \n</ion-header>\n\n\n<ion-content padding class="bodyCategory">\n      <ion-card class="cardback">\n        <img [src]="photoImage" class="photoGame"/>\n        <ion-card-content>\n            <ion-card-title text-align: center>\n                {{ photoTitle }}\n            </ion-card-title>\n          <p *ngIf="isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            If you have been caught, you can guess what the subject is.\n          </p>\n          <p *ngIf="!isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            Remember! The spy is listening and can guess what the subject is.\n          </p>\n        </ion-card-content>\n\n        \n      </ion-card>\n      <p [ngClass]="{\'timer\': !lastSeconds,\n                     \'timerRed\': lastSeconds}"> Time left : {{min}} : {{second}} </p>\n      <!--<button ion-button (click)="LeaveGame()">Vote</button>-->\n      \n       \n\n</ion-content>\n\n\n'/*ion-inline-end:"C:\clone2\trunk\src\pages\game\game.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], GamePage);

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(10);
var map_1 = __webpack_require__(90);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=0.js.map