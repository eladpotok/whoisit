import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsInfoPage } from './points-info';

@NgModule({
  declarations: [
    PointsInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PointsInfoPage),
  ],
})
export class PointsInfoPageModule {}
