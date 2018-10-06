import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";

/**
 * Generated class for the PictureModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-picture-modal',
    templateUrl: 'picture-modal.html',
})
export class PictureModalPage implements OnInit {
    imageObj;

    // let object = {
    //     imageUrlToShow: imageUrlObservable,
    //     imageDesc: imageRaW.desc,
    //     imageId: imageRaW.imageUrl
    // }

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private firebaseServiceProvider: FirebaseServiceProvider,
                private toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.imageObj = this.navParams.get('image');
    }

    submitForm() {
        this.firebaseServiceProvider.updateTextOnImage('iliya-images', this.imageObj);
    }

    cancel() {
        this.navCtrl.pop();
    }

}
