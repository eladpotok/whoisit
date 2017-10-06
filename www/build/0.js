webpackJsonp([0],{

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageModule", function() { return GamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(454);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



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

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
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
    function GamePage(navCtrl, navParams, af) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.userName = this.navParams.get('userName');
        this.roomKey = this.navParams.get('roomKey');
        this.selectorUser = this.navParams.get('selectorUser');
        this.af.object("rooms/" + this.roomKey + "/categoryName").subscribe(function (t) {
            _this.titleGame = t.$value;
        });
        this.drawCard();
    }
    GamePage.prototype.drawCard = function () {
        var _this = this;
        this.af.object("rooms/" + this.roomKey + "/spy").subscribe(function (spy) {
            if (spy.$value == _this.userName) {
                _this.drawSpy();
            }
            else {
                console.log("enter to random card");
                _this.drawRandomCard();
            }
        });
    };
    GamePage.prototype.drawRandomCard = function () {
        var _this = this;
        this.af.list('/categories', { preserveSnapshot: true }).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                if (snapshot.val().category == _this.titleGame) {
                    if (!snapshot.val().isTaken) {
                        _this.photoImage = snapshot.val().link;
                        _this.photoTitle = snapshot.val().title;
                        // Take the key of the image so we can sign it as taken
                        _this.imageKey = snapshot.key;
                        return;
                    }
                }
            });
        });
        // set the image as taken
        this.af.object("/categories/" + this.imageKey + "/isTaken").set(true);
    };
    GamePage.prototype.drawSpy = function () {
        this.photoImage = "assets/spy.png";
        this.photoTitle = "Spy";
        this.isSpy = true;
    };
    GamePage.prototype.LeaveGame = function () {
        //this.af.object(`categories/${this.imageKey}/isTaken`).set(false);
        this.navCtrl.push('EndGamePage', {
            roomKey: this.roomKey
        });
    };
    return GamePage;
}());
GamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-game',template:/*ion-inline-start:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\pages\game\game.html"*/'<!--\n  Generated template for the GamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n \n</ion-header>\n\n\n<ion-content padding>\n      <ion-card>\n        <img [src]="photoImage" class="photo"/>\n        <ion-card-content>\n            <ion-card-title text-align: center>\n                {{ photoTitle }}\n            </ion-card-title>\n          <p *ngIf="isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            If you have been caught, you can guess what the subject is.\n          </p>\n          <p *ngIf="!isSpy">\n            Be aware for the question and try to obsorb any information you can.\n            Remember! The spy is listening and can guess what the subject is.\n          </p>\n        </ion-card-content>\n      </ion-card>\n      <button ion-button (click)="LeaveGame()">Leave</button>\n</ion-content>\n\n\n'/*ion-inline-end:"C:\Users\EladPotok\Desktop\lastChance\spyApp\src\pages\game\game.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], GamePage);

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(10);
var map_1 = __webpack_require__(86);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=0.js.map