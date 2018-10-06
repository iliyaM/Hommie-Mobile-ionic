import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictureModalPage } from './picture-modal';

@NgModule({
  declarations: [
    PictureModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PictureModalPage),
  ],
})
export class PictureModalPageModule {}
