webpackJsonp([1],{

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScorePageModule", function() { return ScorePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__score__ = __webpack_require__(457);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScorePageModule = (function () {
    function ScorePageModule() {
    }
    return ScorePageModule;
}());
ScorePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__score__["a" /* ScorePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__score__["a" /* ScorePage */]),
        ],
    })
], ScorePageModule);

//# sourceMappingURL=score.module.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(460);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScorePage = (function () {
    function ScorePage(navCtrl, navParams, af, auth, roomsSerivce) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.auth = auth;
        this.roomsSerivce = roomsSerivce;
        this.users = roomsSerivce.getUsersFromRoom();
        this.currentUser = auth.currentUser;
        this.roomKey = this.navParams.get('roomKey');
        this.roundKey = this.navParams.get('roundKey');
        console.log("the room key " + this.roomKey);
        this.af.object("rooms/" + this.roomKey + "/spy").subscribe(function (t) {
            _this.spy = t.$value;
            console.log("the spy " + _this.spy);
        });
    }
    ScorePage.prototype.checkWinner = function () {
        var maxVotes = 0;
        var userMax;
        this.af.list("games/" + this.roundKey + "/votes", { preserveSnapshot: true }).subscribe(function (t) {
            t.forEach(function (user) {
                if (user.val().$value > maxVotes) {
                    maxVotes = user.val().$value;
                    userMax = user.val().key;
                }
            });
        });
        if (userMax == this.spy)
            this.isSpyWon = false;
        else
            this.isSpyWon = true;
    };
    ScorePage.prototype.getVotes = function (user) {
        this.af.object("rounds/" + this.roundKey + "/votes/" + user.$key).subscribe(function (t) {
            return t.$value;
        });
        return 0;
    };
    return ScorePage;
}());
ScorePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-score',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\score\score.html"*/'<!--\n  Generated template for the ScorePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>score</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding >\n   \n   <ion-card [ngClass]="isSpyWon ? \'backgroundWin\' : \'backgroundLose\'">\n\n   <ion-item [ngClass]="isSpyWon ? \'backgroundWin\' : \'backgroundLose\'">\n    <ion-avatar item-start>\n      <img [src]="currentUser.imageUrl">\n    </ion-avatar>\n    <h2 >{{ currentUser.displayName }}</h2>\n    <p>{{ currentUser.level }}</p>\n  </ion-item>\n\n  <img src="assets/spy.png">\n\n\n</ion-card>\n\n<ion-list >\n  <ion-item  *ngFor="let user of users">\n    <ion-avatar item-start>\n      <img [src]="user.imageUrl">\n    </ion-avatar>\n     <h2 >{{ user.displayName }}</h2>\n     <p>{{ getVotes(user) }}</p>\n\n  </ion-item>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\score\score.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]) === "function" && _e || Object])
], ScorePage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=score.js.map

/***/ })

});
//# sourceMappingURL=1.js.map