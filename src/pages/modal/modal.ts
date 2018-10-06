import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AccountInterface } from "../../models/models";
import { v4 as uuid } from 'uuid';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { ToastController } from 'ionic-angular';
import { IconsPage } from "../icons/icons";
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html',
})
export class ModalPage implements OnInit {
    formObject: AccountInterface;
    
    currentMonth = moment().format('MM-YYYY');

    iconsArray = [
        'fa fa-cutlery',
        'fa fa-glass',
        'fa fa-music',
        'fa fa-film',
        'fa fa-home',
        'fa fa-road',
        'fa fa-road',
        'fa fa-headphones',
        'fa fa-pencil',
        'fa fa-tint',
        'fa fa-gift',
        'fa fa-plane',
        'fa fa-exclamation-triangle',
        'fa fa-credit-card',
        'fa fa-briefcase',
        'fa fa-users',
        'fa fa-money',
        'fa fa-user-md',
        'fa fa-beer',
        'fa fa-laptop',
        'fa fa-tablet',
        'fa fa-mobile',
        'fa fa-gamepad',
        'fa fa-university',
        'fa fa-graduation-cap',
        'fa fa-spoon',
        'fa fa-car',
        'fa fa-cc-paypal',
        'fa fa-birthday-cake',
        'fa fa-bus',
        'fa fa-user-secret',
        'fa fa-motorcycle',
        'fa fa-heartbeat',
        'fa fa-television',
        'fa fa-black-tie',
    ];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private firebaseServiceProvider: FirebaseServiceProvider,
        private toastCtrl: ToastController,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.formObject = this.navParams.get('data');
        this.formObject.modifier = 'regular';
    }

    submitForm() {
        // Add unique id to object
        this.formObject.id = uuid();

        // Check for icon if not assign Default
        if (this.formObject.icon === null) {
            this.formObject.icon = 'default'
        }

        // Check if month document exists
        this.firebaseServiceProvider.getCollectionRef('iliya-account', this.currentMonth).subscribe(res => {
            if (res.payload.exists) {

                this.firebaseServiceProvider.collectionRef('iliya-account', this.currentMonth, this.formObject.modifier).add(this.formObject).then(a => {
                    this.activateCloseAndClear('רשומה נוספה בהצלחה!');
                }).catch(err => this.activateCloseAndClear(err));
            } else {
                this.firebaseServiceProvider.collectionRef('iliya-account').doc(this.currentMonth)
                .set({[this.formObject.modifier]: this.formObject.modifier}).then(a => {
                    this.activateCloseAndClear('חודש חדש נוסף למערכת');
                }).catch(err => this.activateCloseAndClear(err));
            }
        });

    }

    updateObject(event) {
        this.formObject.date = `${event.day}/${event.month}`;
    }

    updateCurrentMonth(event) {
        this.currentMonth = `${event.month}-${moment().format('YYYY')}`;
    }

    toastMeUp(message) {
        // Send completion message.
        this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        }).present();
    }

    activateCloseAndClear(message) {
        // Clear Object.
        for (let key in this.formObject) {
            if (this.formObject.hasOwnProperty(key)) {
                this.formObject[key] = null;
            }
        }

        // Send completion message.
        this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        }).present();

        // Close modal
        this.navCtrl.pop();
    }

    // Close modal by button
    closeModal() {
        this.navCtrl.pop();
    }

    openIconsModal() {
        this.modalController.create(IconsPage, { 'data': this.formObject, 'iconsArray': this.iconsArray }).present();
    }




}
