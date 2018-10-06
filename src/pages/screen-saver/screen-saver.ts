import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { PictureModalPage } from "../picture-modal/picture-modal";
/**
 * Generated class for the ScreenSaverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-screen-saver',
    templateUrl: 'screen-saver.html',
})
export class ScreenSaverPage implements OnInit {
    constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams, private modalController: ModalController, private firebaseService: FirebaseServiceProvider, private toast: ToastController) {
    }

    images = [];
    imageUrls = [];
    text;

    cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    cameraOptionsForSelections = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };


    ngOnInit() {
        this.fillImageDataByCollection();
    }

    takePicture() {
        this.camera.getPicture(this.cameraOptions)
            .then(data => {
                let base64Image = 'data:image/jpeg;base64,' + data;
                return this.firebaseService.uploadImage(base64Image, 'iliya');
            })
            .then(data => {
                this.imageUrls.push(data.ref.name);
                this.firebaseService.saveImageUrlsAfterUpload('iliya-images', data.ref.name).then(data => {
                    this.createToast('Image uploaded successfully');
                    this.showAll();
                });
            });
    }

    selectPhoto(): void {
        this.camera.getPicture(this.cameraOptionsForSelections)
            .then(data => {
                let base64Image = 'data:image/jpeg;base64,' + data;
                return this.firebaseService.uploadImage(base64Image, 'iliya');
            })
            .then(data => {
                this.images.push(data.ref.name);
                this.firebaseService.saveImageUrlsAfterUpload('iliya-images', data.ref.name).then(data => {
                    this.createToast('Image uploaded successfully');
                    this.showAll();
                });
            });
    }

    fillImageDataByCollection() {
        this.firebaseService.getAllImagesByCollection('iliya-images').subscribe(res => {
            if (res) {
                this.imageUrls = [];

                res.forEach(item => {
                    this.imageUrls.push(item);
                });
                this.showAll();
            }
        });
    }

    private showAll() {
        this.images = [];
        this.imageUrls.forEach(item => {
            if (item['imageUrl']) {
                this.images.push(this.firebaseService.getImage('iliya', item['imageUrl']));
            }
        });
    }

    createToast(message) {
        this.toast.create({
            message: message,
            duration: 3000,
            position: 'top'
        }).present();
    }

    deleteImage(imageUrlObservable, imageRaW) {
        let object = {
            imageUrlToShow: imageUrlObservable,
            imageDesc: imageRaW.desc,
            imageId: imageRaW.imageUrl
        }
        this.firebaseService.deleteImage('iliya-images', object);

        setTimeout(() => {
            this.showAll()
        }, 3000)
    }

    editImageText(imageUrlObservable, imageRaW) {
        let object = {
            imageUrlToShow: imageUrlObservable,
            imageDesc: imageRaW.desc,
            imageId: imageRaW.imageUrl
        }
        this.modalController.create(PictureModalPage, { 'image': object }).present().then(a => this.showAll());
    }
}
