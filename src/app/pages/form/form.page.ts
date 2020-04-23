import { Component, OnInit } from '@angular/core';
import { Form, FormService } from './../../services/form/form.service';
import { RegisterService } from './../../services/register/register.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  form: Form = {
    article: '',
    quantity: null,
    price: null,
    userEmail: '',
    userCompany: '',
  }

  formId = null;
  email: string;
  company: string;

  files: Observable<Form[]>

  constructor(private formService: FormService, private route: ActivatedRoute,
     private loadingController: LoadingController, public router: Router, public afAuth: AngularFireAuth,
     private alertCtrl: AlertController, private toastCtrl: ToastController, private fileChooser: FileChooser,
     private file: File, private registerservice: RegisterService) {
       
      }

  ngOnInit() {
    this.formId = this.route.snapshot.params['id'];
    if (this.formId){
      this.loadForm();
    }
    //this.files = this.formService.getFiles();
    this.getData()
  }

  choose(){
    this.fileChooser.open().then((url) =>{
      alert(url)

      this.file.resolveLocalFilesystemUrl(url).then((newUrl)=>{
        alert(JSON.stringify(newUrl))

        let dirPath = newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/')
        dirPathSegments.pop()
        dirPath = dirPathSegments.join('/')

        this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer) =>{
          await this.upload(buffer, newUrl.name)
        })
      })
    })

  }

  async upload(buffer, name){
    let blob = new Blob([buffer], { type: "image/jpeg" })

    let storage = firebase.storage();

    storage.ref('images/' + name).put(blob).then((d) =>{
      alert("done");
    }).catch((error) =>{
      alert(JSON.stringify(error))
    })
  }

  /*async addFile(){
    let inputAlert = await this.alertCtrl.create({
      title: 'Store New Information',
      inputs:
        {
          name: 'info',
          placeholder: 'Lorem Ipsum Dolor...'
        },
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'store',
          handler: data => {
            this.uploadInfo(data.info);
          }
        }
      ]
    });
    
    inputAlert.present();

  }*/

  uploadInfo(text){
    let upload = this.formService.uploadToStorage(text);

    upload.then(res =>{
      console.log(res)
      this.formService.storeInfoToDb(res.metadata).then(async () => {
        let toast = await this.toastCtrl.create({
          message: 'New file added',
          duration: 3000
        });
        toast.present();
      });
    });
  }

  /*deleteFile(file){
    this.formService.deleteFile(file).subscribe(async () => {
      let toast = await this.toastCtrl.create({
        message: 'File remove',
        duration: 3000
      });
      toast.present();
    });

  }*/

  viewFile(){

  }

  async loadForm(){
    const loading = await this.loadingController.create({
      message: 'Loading Form..'
    });
    await loading.present();

    this.formService.getForm(this.formId).subscribe(res => {
      loading.dismiss();
      this.form = res;
    });
  }

  getData(){
    this.registerservice.getRegisters().subscribe(val => 
      {
        for(let i=0; i < val.length; i++){
            if (val[i].email == this.afAuth.auth.currentUser.email)
              this.email = val[i].email;
              this.company = val[i].company;
          }
          
        })
  }

  async saveForm(){
    //uid = this.afAuth.auth.currentUser.uid
    const enteredArticle = (<HTMLInputElement>document.getElementById("input-article")).value;
    const enteredQuantity = (<HTMLInputElement>document.getElementById("input-quantity")).value;
    const enteredPrice = (<HTMLInputElement>document.getElementById("input-price")).value;
    const enteredQuantityNum = <number><unknown>enteredQuantity;
    const enteredPriceNum = <Number><unknown>enteredPrice;
    this.form.userEmail = this.email;
    this.form.userCompany = this.company;
    


    if(
      enteredArticle.trim().length <= 0 ||
      enteredQuantityNum <= 0 ||
      enteredPriceNum <= 0 ||
      enteredQuantity.trim().length <= 0 ||
      enteredPrice.trim().length <= 0
      ){
        this.presentAlert();
      }else
      {
        const loading = await this.loadingController.create({
          message: 'Saving Form..'
        });
        await loading.present();
        if (this.formId){
          this.formService.updateForm(this.form, this.formId).then(() =>{
            loading.dismiss();
            //this.nav.back('home');
          });
        } else{
          this.formService.addForm(this.form).then(() =>{
            loading.dismiss();
            //this.nav.back('home');
          });
        }
        this.confirmAlert();
        this.router.navigateByUrl("/menu/homeform")
      }
  }

    async presentAlert() {
      const alert = document.createElement('ion-alert');
      alert.header = 'Alert';
      alert.subHeader = 'Invalid inputs';
      alert.message = 'Please enter valid arguments!';
      alert.buttons = ['OK'];

      document.body.appendChild(alert);
      return alert.present();
    }

    async confirmAlert() {
      const alert = document.createElement('ion-alert');
      alert.header = 'Success';
      alert.message = 'Informations updated';
      alert.buttons = ['OK'];

      document.body.appendChild(alert);
      return alert.present();
    }

    async clear() {
      (<HTMLInputElement>document.getElementById("input-article")).value='';
      (<HTMLInputElement>document.getElementById("input-quantity")).value='';
      (<HTMLInputElement>document.getElementById("input-price")).value='';
    }

    goToUpload(){
      this.router.navigateByUrl("/upload")
    }
}
