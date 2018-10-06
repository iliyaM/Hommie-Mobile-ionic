import {Component, OnInit} from '@angular/core';
import {
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams
} from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {NotificationInterface} from "../../models/models";
import {NotificationModalPage} from "../notification-modal/notification-modal";
import {groupFlyInAnimation} from "../../../animations";

@IonicPage()
@Component({
    selector: 'page-notifications-manager',
    templateUrl: 'notifications-manager.html',
    animations:[groupFlyInAnimation]
})
export class NotificationsManagerPage implements OnInit {
    allNotifications;
    documentIds;
    currentMonth = `0${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

    formObject: NotificationInterface = {
        date: null,
        time: null,
        content: null,
        title: null,
        icon: null,
        id: null,
        img: null,
        animations: false
    };

    constructor(public loadingCtrl: LoadingController, private modalController: ModalController, public navCtrl: NavController, public navParams: NavParams, private firebaseServiceProvider: FirebaseServiceProvider) {
    }

    ngOnInit() {
        this.getAllNotifications();
    }

    getAllNotifications() {
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1500
        });
        loader.present();

        this.firebaseServiceProvider.getNotificationRef('notifications').subscribe(res => {
            if (res) {
                if(res.docs.length > 0) {
                    this.allNotifications = res.docs.map(item => item.data())
                } else {
                    this.allNotifications = res.docs[0].data();
                }
            }
        });
    }

    addNewNotification() {
        let modal = this.modalController.create(NotificationModalPage, {'data': this.formObject});
        modal.present();
        modal.onDidDismiss(() => {
            this.getAllNotifications();
        });
    }

    deleteNotification(item) {
        this.firebaseServiceProvider.deleteNotificationEntry(item);

        setTimeout(() => {
            this.getAllNotifications()
        }, 1500)
    }

    editNotification(item) {
        let modal = this.modalController.create(NotificationModalPage, {'data': item, 'isEdit': true});
        modal.present();

        modal.onDidDismiss(() => {
            this.getAllNotifications();
        });
    }
}
