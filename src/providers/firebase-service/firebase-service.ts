import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs";
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as firebase from "firebase";
import { map } from 'rxjs/operator/map';

@Injectable()
export class FirebaseServiceProvider {
    constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    }

    // Main task
    task: AngularFireUploadTask;

    /**
     * Required params for data extraction. DB is separated users => Date Collections => modifiers Add/Subtract
     * @param userAccount
     * @param date
     * @param collectionModificator
     */

    combineAllCollections(accunt, documentDate) {
        const regular = this.afs.collection('iliya-account').doc(documentDate).collection('regular').valueChanges();
        const loans = this.afs.collection('iliya-account').doc(documentDate).collection('loans').valueChanges();
        const sallary = this.afs.collection('iliya-account').doc(documentDate).collection('sallary').valueChanges();
        const savings = this.afs.collection('iliya-account').doc(documentDate).collection('savings').valueChanges();
        const constant = this.afs.collection('iliya-account').doc(documentDate).collection('constant').valueChanges();

        return combineLatest(regular, loans, sallary, savings, constant)

    }

    getAccountsDataByUser(userAccount, date, collectionModificator) {
        return this.afs.collection(userAccount).doc(date).collection(collectionModificator).valueChanges();
    }

    collectionRef(userAccount, date?, collectionModificator?) {
        if (date && collectionModificator) {
            return this.afs.collection(`${userAccount}/${date}/${collectionModificator}`);
        } else {
            return this.afs.collection(`${userAccount}`);
        }

    }

    getAllDataFromAccountCollection(userAccount) {
        return this.afs.collection(userAccount).snapshotChanges();
    }

    getCollectionRef(userAccount, documentMonth) {
        return this.afs.doc(`${userAccount}/${documentMonth}`).snapshotChanges();

    }

    getNotificationRef(collectionName) {
        return this.afs.collection(collectionName).get();
    }

    getDocumentData(userAccount, documentId) {
        let temp = [];
        const subject = new BehaviorSubject(null);

        this.afs.collection(`${userAccount}`).doc(documentId).collection('add').valueChanges().subscribe(res => {
            if (res) {
                temp = [];
                res.forEach(item => temp.push(item));

                this.afs.collection(`${userAccount}`).doc(documentId).collection('remove').valueChanges().subscribe(res => {
                    res.forEach(item => temp.push(item));

                    subject.next(temp);
                });
            }
        });

        return subject;
    }

    deleteAccountEntry(object, accountName, documentMonth) {
        this.afs.collection(`${accountName}`).doc(documentMonth).collection(object.modifier, ref => ref.where('id', '==', object.id)).get().subscribe(res => {
            if (res) {
                let docId = res.docs[0].id;
                this.afs.collection(`${accountName}`).doc(documentMonth).collection(object.modifier).doc(docId).delete();
            }
        });
    }

    deleteNotificationEntry(object) {
        this.afs.collection('notifications', ref => ref.where('id', '==', object.id)).get().subscribe(res => {
            if (res) {
                let docId = res.docs[0].id;
                this.afs.collection('notifications').doc(docId).delete();
            }
        });
    }

    notificatinQueryById(collection, item) {
        return this.afs.collection(collection, ref => ref.where('id', '==', item.id)).get()
    }

    notificationUpdate(id, item) {
        this.afs.collection('notifications').doc(id).update(item);
    }


    // Screens
    getScreenLayouts(collection, documentId) {
        return this.afs.collection(collection).doc(documentId).valueChanges();
    }


    // Layouts
    updateLayout(screenName, layout, selectedMonth?) {
        let month = selectedMonth || null
        this.afs.collection('currenScreenAndLayout').doc('123').update({
            selectedLayout: layout,
            selectedScreen: screenName,
            selectedMonth: month
        });
    }

    //Images
    uploadImage(image: string, id: string): any {
        let storageRef = firebase.storage().ref();
        let imageName = this.generateUUID();
        let imageRef = storageRef.child(`${id}/${imageName}.jpg`);
        return imageRef.putString(image, 'data_url');
    }

    getImage(storageName, imageId: string): any {
        return this.afStorage.ref(`${storageName}/${imageId}`).getDownloadURL();
    }

    private generateUUID(): any {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    saveImageUrlsAfterUpload(collection, imageId) {
        return this.afs.collection(collection).add({ imageUrl: imageId })
    }

    getAllImagesByCollection(collection) {
        return this.afs.collection(collection).valueChanges();
    }

    updateTextOnImage(collection, imageObj) {
        console.log(imageObj)
        this.afs.collection(collection, ref => ref.where('imageUrl', '==', imageObj.imageId)).get().subscribe(res => {
            if (res) {
                let docId = res.docs[0].id;
                this.afs.collection(`${collection}`).doc(docId).update({desc: imageObj.imageDesc});
            }
        });
    }

    deleteImage(collection, imageObj) {
        this.afs.collection(collection, ref => ref.where('imageUrl', '==', imageObj.imageId)).get().subscribe(res => {
            if (res) {
                let docId = res.docs[0].id;
                this.afs.collection(`${collection}`).doc(docId).delete();
                this.afStorage.ref(`${'iliya'}/${imageObj.imageId}`).delete();
            }
        });
    }


}

