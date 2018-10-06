import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-navigation',
    templateUrl: 'navigation.html',
})
export class NavigationPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NavigationPage');
    }

    infoArray = [
        {
            text: 'ניהול מסכים',
            pageLink: 'ScreenConfigPage'
        },
        {
            text: 'ניהול חשבון',
            pageLink: 'AccountManagerPage'
        },
        {
            text: 'ניהול התראות',
            pageLink: 'NotificationsManagerPage'
        },
        {
            text: 'שומר מסך',
            pageLink: 'ScreenSaverPage'
        }
    ];

    navigateToPage(pageLink) {
        this.navCtrl.push(pageLink);
    }

}
