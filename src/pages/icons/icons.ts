import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'icons-page',
    templateUrl: 'icons.html',
})
export class IconsPage implements OnInit {
    iconsArray;
    selectedIcon;
    formObject;
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ngOnInit() {
        this.iconsArray = this.navParams.get('iconsArray');
        this.formObject = this.navParams.get('data');
    }

    close() {
        this.navCtrl.pop()
    }

    handleIconChoosing(icon) {
        this.formObject.icon = icon;
        this.selectedIcon = icon;
    }

    cancel() {
        this.formObject.icon = null;
        this.navCtrl.pop()
    }


}
