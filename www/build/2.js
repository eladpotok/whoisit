webpackJsonp([2],{

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScorePageModule", function() { return ScorePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__score__ = __webpack_require__(475);
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__score__["a" /* ScorePage */]),
        ],
    })
], ScorePageModule);

//# sourceMappingURL=score.module.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__ = __webpack_require__(158);
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
        this.winUsers = [];
        this.loseUsers = [];
        this.votes = {};
        this.intervalId = setInterval(function () {
            _this.backToLobby();
        }, 6000);
        this.users = roomsSerivce.getNonSpyPlayers();
        this.currentUser = this.auth.currentUser;
        this.roundKey = this.navParams.get('roundKey');
        this.spyState = this.navParams.get('spyState');
        this.af.object("settings/" + roomsSerivce.currentRoom.settingsKey).subscribe(function (t) {
            _this.roundsInterval = t.roundsInterval;
            console.log("rounds interval:" + _this.roundsInterval);
        });
        this.af.list("rounds/" + roomsSerivce.currentRoom.$key + "/" + this.roundKey + "/wins").subscribe(function (t) {
            t.forEach(function (user) {
                var userKey = user.$value;
                _this.winUsers.push(_this.roomsSerivce.getUser(userKey));
            });
        });
        this.af.list("rounds/" + roomsSerivce.currentRoom.$key + "/" + this.roundKey + "/loses").subscribe(function (t) {
            t.forEach(function (user) {
                var userKey = user.$value;
                _this.loseUsers.push(_this.roomsSerivce.getUser(userKey));
            });
        });
        // get the spy user
        this.af.object("users/" + this.roomsSerivce.getSpy() + "/").subscribe(function (t) {
            _this.spy = t;
        });
        this.checkVotesStatus();
    }
    ScorePage.prototype.checkVotesStatus = function () {
        var _this = this;
        this.af.list("/rounds/" + this.roomsSerivce.currentRoom.$key + "/" + this.roundKey + "/votesStatus").subscribe(function (t) {
            t.forEach(function (vote) {
                if (vote.$key != null && vote.$value != null) {
                    console.log("the key is " + vote.$key + " and the value is = " + vote.$value);
                    _this.votes[vote.$key] = vote.$value;
                }
            });
        });
    };
    ScorePage.prototype.ionViewWillLeave = function () {
        clearInterval(this.intervalId);
    };
    ScorePage.prototype.backToLobby = function () {
        // set the round as done
        this.af.object("rounds/" + this.roomsSerivce.currentRoom.$key + "/" + this.roundKey + "/state").set("done");
        // this.navCtrl.push('LobbyPage', {
        //   roomKey: this.roomsSerivce.currentRoom.$key
        // });
        //this.af.object(`rooms/${this.roomKey}/isCategorySelected`).set(false);
        //this.af.object(`rooms/${this.roomKey}/selector`).set("");
        this.navCtrl.popTo(this.navCtrl.getByIndex(1));
        // console.log("pop to");
    };
    ScorePage.prototype.getNewPointsForLosers = function () {
        if (this.spyState == "lose") {
            return 3;
        }
        return 0;
    };
    ScorePage.prototype.getPointsOfSpy = function () {
        if (this.spyState == "win") {
            this.isSpyWon = true;
            return 5;
        }
        if (this.spyState == "semi-win") {
            this.isSpyWon = true;
            this.isGreatGuess = true;
            return 3;
        }
        return 0;
    };
    ScorePage.prototype.getNewPointsForWinners = function () {
        return this.getNewPointsForLosers() + 1;
    };
    ScorePage.prototype.votesFor = function (user) {
        return this.votes[user.displayName];
    };
    return ScorePage;
}());
ScorePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-score',template:/*ion-inline-start:"C:\mole-app\trunk\src\pages\score\score.html"*/'<!--\n  Generated template for the ScorePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n<ion-content padding class="bodyCategoryEmpty">\n   \n   <ion-card [ngClass]="isSpyWon ? \'backgroundWin\' : \'backgroundLose\'">\n\n   <ion-item [ngClass]="isSpyWon ? \'backgroundWin\' : \'backgroundLose\'">\n    <ion-avatar item-start>\n      <img [src]="currentUser.imageUrl">\n    </ion-avatar>\n    <h2 >{{ spy?.displayName }}</h2>\n    <p> +  {{getPointsOfSpy()}} points </p>\n\n    <p class="greatGuess" item-end *ngIf="isGreatGuess"> Great Guess </p>\n  </ion-item>\n\n  <img src="assets/spy2.png">\n\n</ion-card>\n\n<ion-list >\n    <ion-item-group>\n        <ion-item-divider color="light">Discover</ion-item-divider>\n\n        <ion-item  *ngFor="let user of winUsers">\n          <ion-avatar item-start>\n            <img [src]="user.imageUrl">\n          </ion-avatar>\n          <h2 >{{ user.displayName }}</h2>\n          <p>+ {{ getNewPointsForWinners()}} points</p>\n          <p item-end> Voted for {{  votesFor(user) }} </p>\n        </ion-item>\n\n  </ion-item-group>\n  <ion-item-group>\n        <ion-item-divider color="light">Faults:</ion-item-divider>\n\n        <ion-item  *ngFor="let user of loseUsers">\n          <ion-avatar item-start>\n            <img [src]="user.imageUrl">\n          </ion-avatar>\n          <h2 >{{ user.displayName }}</h2>\n          <p>+ {{ getNewPointsForLosers()}} points</p>\n          <p item-end> Voted for {{  votesFor(user) }} </p>\n        </ion-item>\n\n  </ion-item-group>\n</ion-list>\n\n<!--<button  ion-button (click)="backToLobby()" class="myButton">Back to Room</button>-->\n\n</ion-content>\n'/*ion-inline-end:"C:\mole-app\trunk\src\pages\score\score.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__services_rooms_service__["a" /* RoomsService */]])
], ScorePage);

//rules
// Spy Wins:
// spy earn 5 points.
// players who voted for spy: 1 points.
// Spy Loses:
// players who voted for spy: 1 points
// all players execpt spy earn 3 points
// If spy guess right he earns 3 points. 
//# sourceMappingURL=score.js.map

/***/ })

});
//# sourceMappingURL=2.js.map