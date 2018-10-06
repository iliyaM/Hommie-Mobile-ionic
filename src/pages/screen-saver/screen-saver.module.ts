import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenSaverPage } from './screen-saver';

@NgModule({
  declarations: [
    ScreenSaverPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenSaverPage),
  ],
})
export class ScreenSaverPageModule {}
