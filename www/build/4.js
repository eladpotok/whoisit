webpackJsonp([4],{

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseCategoryPageModule", function() { return ChooseCategoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_category__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseCategoryPageModule = (function () {
    function ChooseCategoryPageModule() {
    }
    return ChooseCategoryPageModule;
}());
ChooseCategoryPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__choose_category__["a" /* ChooseCategoryPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choose_category__["a" /* ChooseCategoryPage */]),
        ],
    })
], ChooseCategoryPageModule);

//# sourceMappingURL=choose-category.module.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(458);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChooseCategoryPage = (function () {
    function ChooseCategoryPage(navCtrl, navParams, af, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.authService = authService;
        this.categories = [];
        var pokemon = {
            title: "Pokemon",
            description: "Catch'em all!",
            url: "assets/pokemonIcon.png"
        };
        var movies = {
            title: "Movies",
            description: "Did you watch it?!",
            url: "assets/moviesIcon.png"
        };
        var location = {
            title: "Locations",
            description: "What dould you take to...?",
            url: "assets/locationIcon.png"
        };
        var food = {
            title: "Food",
            description: "Yammmm....",
            url: "assets/foodIcon.png"
        };
        var celeb = {
            title: "Celebs",
            description: "I know him!",
            url: "assets/celebIcon.png"
        };
        this.categories.push(pokemon);
        this.categories.push(movies);
        this.categories.push(location);
        this.categories.push(food);
        this.categories.push(celeb);
    }
    ChooseCategoryPage.prototype.select = function (category) {
        var roomKey = this.navParams.get('roomKey');
        this.af.object("/rooms/" + roomKey + "/categoryName").set(category.title);
        this.af.object("/rooms/" + roomKey + "/isCategorySelected").set(true);
        this.navCtrl.push('GamePage', {
            roomKey: roomKey,
            userName: this.authService.currentUser.displayName,
            selectorUser: this.authService.currentUser.displayName
        });
    };
    return ChooseCategoryPage;
}());
ChooseCategoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-choose-category',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\choose-category\choose-category.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Choose a category!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-list>\n  <ion-item  *ngFor="let item of categories" >\n    <ion-thumbnail item-start>\n      <img [src]="item.url">\n    </ion-thumbnail>\n    <h2>{{ item.title }}</h2>\n    <p>{{ item.description }}</p>\n    <button ion-button clear item-end (click)="select(item)">Select</button>\n  </ion-item>\n</ion-list>\n\n\n<!--<ion-list>\n  <ion-item>\n    <ion-label>Category</ion-label>\n    <ion-select [(ngModel)]="categoryName">\n      <ion-option value="Cartoons" >Cartoons</ion-option>\n      <ion-option value="Pokemon">Pokemon</ion-option>\n      <ion-option value="Locations" >Locations</ion-option>\n    </ion-select>\n  </ion-item>\n</ion-list>-->\n\n<!--<button ion-button (click)="go()">Go ! </button>-->\n\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\choose-category\choose-category.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]])
], ChooseCategoryPage);

//# sourceMappingURL=choose-category.js.map

/***/ })

});
//# sourceMappingURL=4.js.map