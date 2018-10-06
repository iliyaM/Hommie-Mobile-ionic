import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenConfigPage } from './screen-config';

@NgModule({
  declarations: [
    ScreenConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenConfigPage),
  ],
})
export class ScreenConfigPageModule {}
