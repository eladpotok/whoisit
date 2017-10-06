// import {AngularFireAuth } from 'angularfire2/auth'
// import { Platform } from 'ionic-angular';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
 
//  export class AuthService {

//      constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
//               public alertCtrl: AlertController, private fb: Facebook, private platform: Platform) {
//     }

//  public signInWithFacebook() {
    
//     if (this.platform.is('cordova')) {
//        this.fb.login(['email', 'public_profile']).then(res => {
//         const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
//         firebase.auth().signInWithCredential(facebookCredential);
     
//         // this.showMsg("wellcome" , firebase.auth().currentUser.displayName);

//       })
//     }
//     else {
//       return this.afAuth.auth
//         .signInWithPopup(new firebase.auth.FacebookAuthProvider())
//         .then(res => console.log(res));
//     }
//   }

//   public signOut() {
//     this.afAuth.auth.signOut();
//   }
//  }