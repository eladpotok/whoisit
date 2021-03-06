webpackJsonp([3],{

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointsInfoPageModule", function() { return PointsInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__points_info__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointsInfoPageModule = (function () {
    function PointsInfoPageModule() {
    }
    return PointsInfoPageModule;
}());
PointsInfoPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__points_info__["a" /* PointsInfoPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__points_info__["a" /* PointsInfoPage */]),
        ],
    })
], PointsInfoPageModule);

//# sourceMappingURL=points-info.module.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointsInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
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
 * Generated class for the PointsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PointsInfoPage = (function () {
    function PointsInfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PointsInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointsInfoPage');
    };
    return PointsInfoPage;
}());
PointsInfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-points-info',template:/*ion-inline-start:"C:\mole-app\trunk\src\pages\points-info\points-info.html"*/'<!--\n  Generated template for the PointsInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Points Calculation</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="body">\n  <label class="textLabel">\n\n\n      <ion-list>\n          <ion-list-header class="instructionItem" no-lines>\n              <ion-icon name="play" style="color: #03707a"></ion-icon>\n            Spy Wins\n          </ion-list-header>\n          <div class="speech-bubble">\n              <p>\n                  Each of the players who voted for the spy, earns 1 Point.\n                  <br>\n                  The spy itself earns 5 Points.\n              </p>\n            </div>\n      \n          \n      </ion-list>\n<br>\n      <ion-list>\n          <ion-list-header class="instructionItem" no-lines>\n              <ion-icon name="play" style="color: #03707a"></ion-icon>\n            Spy Loses\n          </ion-list-header>\n          <div class="speech-bubble">\n              <p>\n                  Each of the players who voted for the spy earns 1 Point.\n                  <br>\n                  The spy now has an option to guess what the subject is.\n                  <br>\n                  If he guesses correctly, he earns 3 points, and other players earn nothing.\n                  <br>\n                  If he guesses worng, all other players earn 5 points.\n              </p>\n            </div>\n      \n          \n      </ion-list>\n\n\n\n  </label>\n</ion-content>\n'/*ion-inline-end:"C:\mole-app\trunk\src\pages\points-info\points-info.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], PointsInfoPage);

//# sourceMappingURL=points-info.js.map

/***/ })

});
//# sourceMappingURL=3.js.map