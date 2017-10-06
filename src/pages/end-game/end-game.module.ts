import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndGamePage } from './end-game';

@NgModule({
  declarations: [
    EndGamePage,
  ],
  imports: [
    IonicPageModule.forChild(EndGamePage),
  ],
})
export class EndGamePageModule {}
