import { AngularFireModule } from 'angularfire2';
import { AuthService } from './auth.service';
import { RoomsService } from './rooms.service';
import { MessagesService } from './messages.service';
import { NgModule } from '@angular/core';

export const firebaseConfig = {
    apiKey: "AIzaSyCrhPHs2WduPHNofLVkU4a4b1knUGH6gFA",
    authDomain: "spycookie-31a6f.firebaseapp.com",
    databaseURL: "https://spycookie-31a6f.firebaseio.com",
    projectId: "spycookie-31a6f",
    storageBucket: "spycookie-31a6f.appspot.com",
    messagingSenderId: "459704495117"
};

@NgModule({
    declarations: [
    ],
    imports: [
         AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [
        AuthService,
        RoomsService,
        MessagesService
    ],
    exports: [
    ]
})
export class ServicesModule { }
