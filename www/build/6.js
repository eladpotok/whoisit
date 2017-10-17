webpackJsonp([6],{

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPageModule", function() { return AdminPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin__ = __webpack_require__(460);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdminPageModule = (function () {
    function AdminPageModule() {
    }
    return AdminPageModule;
}());
AdminPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__admin__["a" /* AdminPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__admin__["a" /* AdminPage */]),
        ],
    })
], AdminPageModule);

//# sourceMappingURL=admin.module.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(67);
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
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdminPage = (function () {
    function AdminPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.format = "png";
    }
    AdminPage.prototype.add = function () {
        var _this = this;
        console.log("1");
        var subscription = this.af.list("categories/").subscribe(function (t) {
            t.forEach(function (cat) {
                console.log("2> " + cat.title);
                if (cat.title == _this.categoryName) {
                    var member = {
                        title: _this.subjectTitle,
                        url: "assets/" + _this.categoryName + "/" + _this.indexPhoto.toString() + "." + _this.format
                    };
                    subscription.unsubscribe();
                    _this.af.object("categories/" + cat.$key + "/members/" + _this.indexPhoto).set(member);
                }
            });
        });
    };
    return AdminPage;
}());
AdminPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-admin',template:/*ion-inline-start:"C:\coockieSpyClone\trunk\src\pages\admin\admin.html"*/'<!--\n  Generated template for the AdminPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>admin</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-list>\n    <ion-item>\n      <ion-label fixed color="darkBlack" >categoryName</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="categoryName"  ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed color="darkBlack" >subject title</ion-label>\n      <ion-input type="text" value=""  [(ngModel)]="subjectTitle"  ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed color="darkBlack" >index photo</ion-label>\n      <ion-input type="text" value=""  [(ngModel)]="indexPhoto" ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed color="darkBlack" >format</ion-label>\n      <ion-input type="text" value="png"  [(ngModel)]="format" ></ion-input>\n    </ion-item>\n\n\n  </ion-list>\n<button (click)="add()">Add</button>\n</ion-content>\n'/*ion-inline-end:"C:\coockieSpyClone\trunk\src\pages\admin\admin.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], AdminPage);

//# sourceMappingURL=admin.js.map

/***/ })

});
//# sourceMappingURL=6.js.map