import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { map } from 'rxjs/operators';

export interface Form {
  article: string;
  quantity: number;
  price: number;
  userEmail: string;
  userCompany: string;
}



@Injectable({
  providedIn: 'root'
})
export class FormService {
  images = [];

  private formsCollection: AngularFirestoreCollection<Form>;
  private forms: Observable<Form[]>;

  constructor(private db: AngularFirestore, private afStorage: AngularFireStorage) {
    this.formsCollection = db.collection<Form>('forms');

    this.forms = this.formsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }


  getForms() {
  return this.forms;
  }

  getForm(id) {
  return this.formsCollection.doc<Form>(id).valueChanges();
  }

  updateForm(form: Form, id: string) {
  return this.formsCollection.doc(id).update(form);
  }

  addForm(form: Form) {
  return this.formsCollection.add(form);
  }

  removeForm(id){
  return this.formsCollection.doc(id).delete();
  }

  getFiles(){

    return this.formsCollection.snapshotChanges().forEach(changes =>{
      return changes.map(c =>({id: c.payload.doc.id, ...c.payload.doc.data() }));
    });
  }

  /*getImageDatabase() {
    this.afDb.list('Images').snapshotChanges(['child_added']).subscribe(image => {
      image.forEach(image => {
        this.getImageStorage(image);
      });
    });
  }*/

  getImageStorage(image: any){
    const imgRef = image.payload.exportVal().ref;
    this.afStorage.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      console.log(imgUrl);
      this.images.push({
        name: image.payload.exportVal().name,
        url: imgUrl
      });
    });
}

  uploadToStorage(information): AngularFireUploadTask{
    let newName = `${new Date().getTime()}.txt`;
    return this.afStorage.ref(`files/${newName}`).putString(information);
  }

  storeInfoToDb(metainfo) {
    let toSave = {
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType
    }
    return this.db.collection('forms').add(toSave)
  }

}
