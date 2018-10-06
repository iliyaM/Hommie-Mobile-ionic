import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccountManagerPage} from './account-manager';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
@NgModule({
    declarations: [
        AccountManagerPage,
    ],
    imports: [
        IonicPageModule.forChild(AccountManagerPage),
    ],
    providers: [FirebaseServiceProvider]
})
export class AccountManagerPageModule {
}
