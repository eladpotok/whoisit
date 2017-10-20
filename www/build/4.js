webpackJsonp([4],{

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndGamePageModule", function() { return EndGamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__end_game__ = __webpack_require__(462);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EndGamePageModule = (function () {
    function EndGamePageModule() {
    }
    return EndGamePageModule;
}());
EndGamePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__end_game__["a" /* EndGamePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__end_game__["a" /* EndGamePage */]),
        ],
    })
], EndGamePageModule);

//# sourceMappingURL=end-game.module.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EndGamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_rooms_service__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EndGamePage = (function () {
    function EndGamePage(navCtrl, navParams, af, roomService, auth, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.roomService = roomService;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.usersModel = [];
        // get the round key
        this.roundKey = this.navParams.get('roundKey');
        // check if i am the spy
        if (this.IamTheSpy()) {
            this.presentLoading();
            this.af.object("rounds/" + this.roomService.currentRoom.$key + "/" + this.roundKey + "/spyState").subscribe(function (spy) {
                if (spy.$value == "found") {
                    _this.dismissLoading();
                    // go to guess subject page
                    _this.navCtrl.push("GuessPage", { roundKey: _this.roundKey });
                }
                else if (spy.$value == "win" || spy.$value == "semi-win" || spy.$value == "lose") {
                    _this.dismissLoading();
                    _this.addPointsToSpy(spy.$value);
                    // go to score page 
                    _this.navCtrl.push('ScorePage', { roundKey: _this.roundKey, spyState: spy.$value });
                }
            });
        }
        else {
            // show the suspisious users
            this.usersModel = this.loadUsers();
            this.af.object("rounds/" + this.roomService.currentRoom.$key + "/" + this.roundKey + "/isAllVoted").subscribe(function (votes) {
                // check if all users voted
                if (votes.$value) {
                    _this.af.object("rounds/" + _this.roomService.currentRoom.$key + "/" + _this.roundKey + "/spyState").subscribe(function (spy) {
                        if (spy.$value == "win" || spy.$value == "semi-win" || spy.$value == "lose") {
                            _this.dismissLoading();
                            _this.addPointsToPlayer(spy.$value);
                            // go to score page 
                            _this.navCtrl.push('ScorePage', { roundKey: _this.roundKey, spyState: spy.$value });
                        }
                    });
                }
            });
        }
    }
    EndGamePage.prototype.addPointsToPlayer = function (spyState) {
        if (spyState == "lose") {
            this.auth.currentUser.pointsInRoom += 3;
            this.af.object("/rooms/" + this.roomService.currentRoom.$key + "/users/" + this.auth.currentUser.$key).set(this.auth.currentUser.pointsInRoom);
        }
    };
    EndGamePage.prototype.addPointsToSpy = function (spyState) {
        var points = 0;
        switch (spyState) {
            case "win":
                points = 5;
                break;
            case "semi-win":
                points = 3;
                break;
        }
        this.auth.currentUser.pointsInRoom += points;
        this.af.object("/rooms/" + this.roomService.currentRoom.$key + "/users/" + this.auth.currentUser.$key).set(this.auth.currentUser.pointsInRoom);
    };
    EndGamePage.prototype.loadUsers = function () {
        return this.roomService.getUsersFromRoomButme(this.auth.currentUser);
    };
    EndGamePage.prototype.IamTheSpy = function () {
        return this.auth.currentUser.$key == this.roomService.getSpy();
    };
    EndGamePage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Wait till all players vote...",
        });
        this.loader.present();
    };
    EndGamePage.prototype.dismissLoading = function () {
        if (this.loader != null)
            this.loader.dismiss();
    };
    EndGamePage.prototype.voteUser = function (user) {
        var _this = this;
        var counter = 0;
        var subscribtion = this.af.object("/rounds/" + this.roomService.currentRoom.$key + "/" + this.roundKey + "/votes/" + user.$key).subscribe(function (u) {
            counter = u.$value;
            if (subscribtion != null)
                subscribtion.unsubscribe();
            counter++;
            _this.af.object("/rounds/" + _this.roomService.currentRoom.$key + "/" + _this.roundKey + "/votes/" + user.$key).set(counter);
        });
    };
    EndGamePage.prototype.selectUser = function (user) {
        // show loader
        this.presentLoading();
        // vote for the selected user
        this.voteUser(user);
        // check if I selected right
        if (user.$key == this.roomService.getSpy()) {
            this.auth.currentUser.pointsInRoom += 1;
            // add the current user to the win user list
            this.af.list("/rounds/" + this.roomService.currentRoom.$key + "/" + this.roundKey + "/wins/").push(this.auth.currentUser.$key);
        }
        else {
            // add the current user to the lose user list
            this.af.list("/rounds/" + this.roomService.currentRoom.$key + "/" + this.roundKey + "/loses/").push(this.auth.currentUser.$key);
        }
        // in case you find the real spy you get 1 points
        this.af.object("/rooms/" + this.roomService.currentRoom.$key + "/users/" + this.auth.currentUser.$key).set(this.auth.currentUser.pointsInRoom);
    };
    return EndGamePage;
}());
EndGamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-end-game',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\end-game\end-game.html"*/'<!--\n  Generated template for the EndGamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Who\'s the spy?</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="bodyCategory">\n   <ion-list *ngIf="!isTheSpy">\n    <ion-item ion-item *ngFor="let item of usersModel" (click)="selectUser(item)" class="cardBody">\n      <ion-avatar item-start>\n        <img [src]="item.imageUrl">\n      </ion-avatar>\n      <h2> {{ item.displayName }}</h2>\n      <ion-avatar item-end>\n        <img item-end src="assets/spy.png">\n      </ion-avatar>\n      \n    </ion-item>\n  </ion-list> \n\n  <!--<button *ngIf="spyReadyToVote" ion-button class="myButton" >vote</button>-->\n\n\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\end-game\end-game.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__services_rooms_service__["a" /* RoomsService */], __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], EndGamePage);

//# sourceMappingURL=end-game.js.map

/***/ })

});
//# sourceMappingURL=4.js.map