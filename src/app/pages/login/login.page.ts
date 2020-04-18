import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';


import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = {
    email: '',
    password: '',
  }

  constructor(public afAuth: AngularFireAuth, public router: Router, public alertCtrl: AlertController, public toastCtrl: ToastController,
  public loadingCtrl: LoadingController ) { }

  ngOnInit() {

  }
  async alertUserNotFound(){
    const alert = document.createElement('ion-alert');
    alert.message = 'User not found';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async alertEmail() {
    const alert = document.createElement('ion-alert');
    alert.message = 'You have entered an invalid email address!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async wrongPassword(){
    const alert = document.createElement('ion-alert');
    alert.message = 'Wrong Password!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async log(){
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password).then(()=>{
        
        this.router.navigateByUrl('/menu/home')
      })
    }catch(err){
      console.dir(err)
      if (err.code === "auth/user-not-found"){
         this.alertUserNotFound();
        
      }else if (err.code === "auth/invalid-email"){
          this.alertEmail();
      }else if (err.code === "auth/wrong-password") {
          this.wrongPassword();
      }


    }
  }
  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                //showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  goToRegister(){
    this.router.navigateByUrl("/register")
  }
}