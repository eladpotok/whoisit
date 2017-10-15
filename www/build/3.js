webpackJsonp([3],{

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuessPageModule", function() { return GuessPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guess__ = __webpack_require__(463);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GuessPageModule = (function () {
    function GuessPageModule() {
    }
    return GuessPageModule;
}());
GuessPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__guess__["a" /* GuessPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guess__["a" /* GuessPage */]),
        ],
    })
], GuessPageModule);

//# sourceMappingURL=guess.module.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuessPage; });
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





var GuessPage = (function () {
    function GuessPage(navCtrl, navParams, af, auth, roomsService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.auth = auth;
        this.roomsService = roomsService;
        this.members = [];
        this.roundKey = this.navParams.get('roundKey');
        this.af.object("rounds/" + this.roomsService.currentRoom.$key + "/" + this.roundKey + "/categoryKey").subscribe(function (catKey) {
            _this.af.list("categories/" + catKey.$value + "/members").subscribe(function (mem) {
                _this.members = mem;
            });
        });
        this.af.object("rounds/" + this.roomsService.currentRoom.$key + "/" + this.roundKey + "/secret").subscribe(function (secret) {
            _this.secret = secret.$value;
        });
    }
    GuessPage.prototype.choose = function (category) {
        if (this.secret.toString() == category.$key) {
            this.af.object("/rounds/" + this.roomsService.currentRoom.$key + "/" + this.roundKey + "/spyState").set("semi-win");
        }
        else {
            this.af.object("/rounds/" + this.roomsService.currentRoom.$key + "/" + this.roundKey + "/spyState").set("lose");
        }
    };
    return GuessPage;
}());
GuessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-guess',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\guess\guess.html"*/'<!--\n  Generated template for the GuessPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>guess</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="card-background-page" >\n\n  <ion-card *ngFor="let cat of members " (click)="choose(cat)" class="cardsize">\n    <img [src]="cat.url" class="imgSize"/>\n    <div class="card-title">{{cat.title}}</div>\n    <!--<div class="card-subtitle">41 Listings</div>-->\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\guess\guess.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]) === "function" && _e || Object])
], GuessPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=guess.js.map

/***/ })

});
//# sourceMappingURL=3.js.map