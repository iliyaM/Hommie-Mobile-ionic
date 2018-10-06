import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { groupFlyInAnimation } from "../../../animations";
import * as moment from 'moment'
/**
 * Generated class for the ScreenConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-screen-config',
    templateUrl: 'screen-config.html',
    animations: [groupFlyInAnimation]
})
export class ScreenConfigPage implements OnInit {
    @ViewChild(Slides) slides: Slides;
    slideIndex = 0;
    selectedLayout = null;
    mothSelector = false;
    documentIds;

    slidesArray = [
        {
            title: "מסך חשבון",
            documentId: 'account',
            watchingMonth: `${moment().format('MM-YYYY')}`
        },
        {
            title: "מסך התראות",
            documentId: 'notifications',
            watchingMonth: null
        },
        {
            title: "שומר מסך",
            documentId: 'screenSaver',
            watchingMonth: null
        },
    ];
    layouts = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseServiceProvider) {
    }


    ngOnInit() {
        this.getInfoOnCurrentSlider();

        // Get all Document Ids (Months);
        this.firebase.getAllDataFromAccountCollection('iliya-account').subscribe(res => {
            this.documentIds = res.map(item => item.payload.doc.id);
        });
    }

    updateFb(event) {
        this.mothSelector = false;
        this.slidesArray[0].watchingMonth = event.target.value;

        // Update initial layout and screen
        this.firebase.updateLayout(this.slidesArray[0].documentId, this.selectedLayout, event.target.value);

    }

    slideChanged() {
        this.slideIndex = this.slides.getActiveIndex();
        this.getInfoOnCurrentSlider();
    }

    getInfoOnCurrentSlider() {
        if (this.slideIndex) {
            this.firebase.getScreenLayouts('screens', this.slidesArray[this.slideIndex].documentId).subscribe(res => {
                if (res) {
                    this.layouts = [];
                    this.layouts = res['layouts'];

                    this.selectedLayout = this.layouts[0];

                    // Update initial layout and screen
                    this.firebase.updateLayout(this.slidesArray[this.slideIndex].documentId, this.selectedLayout);
                }
            });
        } else {
            this.firebase.getScreenLayouts('screens', this.slidesArray[0].documentId).subscribe(res => {
                if (res) {
                    this.layouts = [];
                    this.layouts = res['layouts'];
                    this.selectedLayout = this.layouts[0]
                    this.firebase.updateLayout(this.slidesArray[0].documentId, this.selectedLayout);
                }
            });

        }
    }

    setSelectedLayout(item) {
        this.selectedLayout = item;
        this.firebase.updateLayout(this.slidesArray[this.slideIndex].documentId, item);
    }

}
