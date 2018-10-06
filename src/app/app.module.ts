import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import {FirebaseServiceProvider} from '../providers/firebase-service/firebase-service';
import {NavigationPageModule} from "../pages/navigation/navigation.module";
import {NavigationPage} from "../pages/navigation/navigation";
import {AccountManagerPageModule} from "../pages/account-manager/account-manager.module";
import {ModalPageModule} from "../pages/modal/modal.module";
import {IconsPageModule} from "../pages/icons/icons.module";
import {NotificationModalPageModule} from "../pages/notification-modal/notification-modal.module";
import {NotificationsManagerPageModule} from "../pages/notifications-manager/notifications-manager.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScreenSaverPageModule} from "../pages/screen-saver/screen-saver.module";
import {PictureModalPageModule} from "../pages/picture-modal/picture-modal.module";
import { Camera } from '@ionic-native/camera';

const firebaseConfig = {
    apiKey: "AIzaSyA2YZe2UBP9dUwMzvYq0ARXi8EiAoUiItI",
    authDomain: "hommie-5ee15.firebaseapp.com",
    databaseURL: "https://hommie-5ee15.firebaseio.com",
    projectId: "hommie-5ee15",
    storageBucket: "hommie-5ee15.appspot.com",
    messagingSenderId: "399260066278"
};

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule.enablePersistence(),
        NavigationPageModule,
        AccountManagerPageModule,
        ModalPageModule,
        IconsPageModule,
        NotificationModalPageModule,
        NotificationsManagerPageModule,
        ScreenSaverPageModule,
        AngularFireStorageModule,
        PictureModalPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        NavigationPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        FirebaseServiceProvider,
    ]
})
export class AppModule {
}
