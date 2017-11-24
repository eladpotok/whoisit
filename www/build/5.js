webpackJsonp([5],{

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstructionsPageModule", function() { return InstructionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instructions__ = __webpack_require__(472);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InstructionsPageModule = (function () {
    function InstructionsPageModule() {
    }
    return InstructionsPageModule;
}());
InstructionsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__instructions__["a" /* InstructionsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__instructions__["a" /* InstructionsPage */]),
        ],
    })
], InstructionsPageModule);

//# sourceMappingURL=instructions.module.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstructionsPage; });
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
 * Generated class for the InstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InstructionsPage = (function () {
    function InstructionsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InstructionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InstructionsPage');
    };
    return InstructionsPage;
}());
InstructionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-instructions',template:/*ion-inline-start:"C:\mole\trunk\src\pages\instructions\instructions.html"*/'<!--\n  Generated template for the InstructionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>instructions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n"\n<ion-content padding class="alternativeBack">\n  <label class="textLabel">\nMole is a social game application for groups of people.\n<br><br>\nA player may create a room and invite his friends to join. In each turn, one of the players selects a category from a huge pool, and each player, but one, gets a subject from the selected category.\nThe last player, who is secretly raffled as a mole, gets a unknown subject.\n\nNo one knows who the mole is, and the mle does not know the subject.\nIn each round there is a random category selector and a mole.\nThe round is about 8 mins, and every player asks another player a trivial question about the subject.\nThe player who answered will ask the next question, and so on.\n\nThe purpose of the question is to interrogate each other and find the mole. \nBe careful not to ask and answer clearly. In case the mole is found, he has a way out to win.\nIf he guesses the subject correctly, he wins.\n  </label>\n</ion-content>\n'/*ion-inline-end:"C:\mole\trunk\src\pages\instructions\instructions.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], InstructionsPage);

//# sourceMappingURL=instructions.js.map

/***/ })

});
//# sourceMappingURL=5.js.map