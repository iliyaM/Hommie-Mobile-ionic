import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NotificationInterface} from "../../models/models";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {v4 as uuid} from 'uuid';
import {IconsPage} from "../icons/icons";
import * as moment from 'moment'

/**
 * Generated class for the NotificationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-notification-modal',
    templateUrl: 'notification-modal.html',
})
export class NotificationModalPage implements OnInit {
    formObject: NotificationInterface;
    documentMonth = moment().format('MM-YYYY');
    isEdit: false;
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
        'fa fa-black-tie'
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
        this.isEdit = this.navParams.get('isEdit');
        this.formObject.animations = false;
    }

    submitForm() {
        if(this.isEdit) {
            this.firebaseServiceProvider.notificatinQueryById('notifications', this.formObject).subscribe(res => {
                if(res) {
                    let docId = res.docs[0].id;
                    this.firebaseServiceProvider.notificationUpdate(docId, this.formObject);
                    this.activateCloseAndClear('Updated')
                } else {
                    this.activateCloseAndClear('Not found')
                }
            })

        } else {
            // Add unique id to object
            this.formObject.id = uuid();

            // Update time and Date
            this.formObject.time = moment().format('HH:MM');
            this.formObject.date = moment().format('DD-MM');

            // Check if month document exists
            this.firebaseServiceProvider.getNotificationRef('notifications').subscribe(res => {
                if (res) {
                    this.firebaseServiceProvider.collectionRef('notifications').add(this.formObject).then(a => {
                        this.activateCloseAndClear('High Five Great Success');
                    }).catch(err => this.activateCloseAndClear(err));
                }
            });
        }

        this.isEdit = false;
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
        this.modalController.create(IconsPage, {'data': this.formObject, 'iconsArray': this.iconsArray}).present();
    }


}







