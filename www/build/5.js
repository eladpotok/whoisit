webpackJsonp([5],{

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstructionsPageModule", function() { return InstructionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instructions__ = __webpack_require__(469);
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

/***/ 469:
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
        selector: 'page-instructions',template:/*ion-inline-start:"C:\Users\elad.potok\Desktop\whoisit.git\trunk\src\pages\instructions\instructions.html"*/'<!--\n  Generated template for the InstructionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>instructions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="body">\n  <label class="textLabel">\n\n  \n\n<ion-list >\n  <ion-list-header class="instructionItem" no-lines>\n    <ion-icon name="play" style="color: #03707a"></ion-icon>\n    Brief\n  </ion-list-header>\n\n      <div class="speech-bubble">\n          <p>      Spy Finder is a social game application for groups of people (At least 4 players).\n            </p>\n        </div>\n\n</ion-list>\n<br>\n<ion-list>\n    <ion-list-header class="instructionItem" no-lines>\n        <ion-icon name="play" style="color: #03707a"></ion-icon>\n      Starting\n    </ion-list-header>\n    <div class="speech-bubble">\n        <p>\n            A player may create a room and invite his friends to join by a unuiqe entry code. \n            In each round, one of the players selects a category from a huge pool, and each player, but one, gets a subject from the selected category.\n            The last player, who is secretly raffled as a spy, gets a "spy" character instead of the subject which is given to the other players.\n        </p>\n      </div>\n\n    \n</ion-list>\n\n<br>\n\n<ion-list>\n    <ion-list-header class="instructionItem" no-lines>\n        <ion-icon name="play" style="color: #03707a"></ion-icon>\n      Rounds\n    </ion-list-header>\n    <div class="speech-bubble">\n        <p>\n            No one knows who the spy is, and the spy does not know what the subject is.\n            In each round there is a random category selector and a random spy.\n            The round is about 8 mins, and every player asks another player a trivial question about the subject.\n            The player who answered will ask the next question, and so on.\n        </p>\n      </div>\n\n    \n</ion-list>\n\n<br>\n\n<ion-list>\n    <ion-list-header class="instructionItem" no-lines>\n        <ion-icon name="play" style="color: #03707a"></ion-icon> \n      Purpose\n    </ion-list-header>\n    \n\n        <div class="speech-bubble">\n            <p>\n                The purpose of the question is to interrogate each other and find the spy. \n                Be careful not to ask and answer too clearly questions and answers. In case the spy is catched, he has a way out to win.\n                If he guesses the subject correctly, he wins.\n            </p>\n          </div>\n</ion-list>\n\n\n  </label>\n</ion-content>\n'/*ion-inline-end:"C:\Users\elad.potok\Desktop\whoisit.git\trunk\src\pages\instructions\instructions.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], InstructionsPage);

//# sourceMappingURL=instructions.js.map

/***/ })

});
//# sourceMappingURL=5.js.map