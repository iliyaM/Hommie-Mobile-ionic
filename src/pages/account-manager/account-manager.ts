import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { ModalPage } from "../modal/modal";
import { AccountInterface } from "../../models/models";
import { groupFlyInAnimation } from "../../../animations";
import * as moment from 'moment';
/**
 * Generated class for the AccountManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account-manager',
    templateUrl: 'account-manager.html',
    animations: [groupFlyInAnimation]
})

export class AccountManagerPage {
    entries;
    documentIds;
    currentMonth = moment().format('MM-YYYY');

    formObject: AccountInterface = {
        date: null,
        desc: null,
        icon: null,
        id: null,
        value: null,
        modifier: null
    };


    constructor(public loadingCtrl: LoadingController, private modalController: ModalController, public navCtrl: NavController, public navParams: NavParams, private firebaseServiceProvider: FirebaseServiceProvider) {
    }

    add() {
        this.modalController.create(ModalPage, { 'data': this.formObject }).present();
    }

    showAll() {
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1000
        });
        loader.present();

        // Get all Document Ids (Months);
        this.firebaseServiceProvider.getAllDataFromAccountCollection('iliya-account').subscribe(res => {
            this.documentIds = res.map(item => item.payload.doc.id);

            this.firebaseServiceProvider.combineAllCollections('iliya-account', this.currentMonth).subscribe(res => {
                if (res) {
                    this.entries = [].concat(...res);
                }
            })
        });
    }

    checkClass(item) {
        switch (item.modifier) {
            case 'regular':
                return 'fa fa-ils'
            case 'sallary':
                return 'fa fa-black-tie';
            case 'loans':
                return 'fa fa-university'
            case 'savings':
                return 'fa fa-briefcase'
        }

    }

    selectionChanged(e) {
        console.log(e)
        this.firebaseServiceProvider.combineAllCollections('iliya-account', this.currentMonth).subscribe(res => {
            if (res) {
                this.entries = [].concat(...res);
            }
        });
    }

    deleteItem(item) {
        this.firebaseServiceProvider.deleteAccountEntry(item, 'iliya-account', this.currentMonth)
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1000
        });
        loader.present();

        setTimeout(() => {
            this.showAll()
        }, 1500)
    }

}
