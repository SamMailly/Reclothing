import { Component, OnInit } from '@angular/core';
import { Login } from './../../services/login/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: Login = {
    email: '',
    password: '',
  }


  loginId = null;
  constructor(public afAuth: AngularFireAuth ) { }

  ngOnInit() {

  }
  async alertUserNotFound(){
    const alert = document.createElement('ion-alert');
    alert.message = 'User not found';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }
  async log(){
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password)
    }catch(err){
      console.dir(err)
      if (err.code === "auth/user-not-found"){
          this.alertUserNotFound();
      }
    }
  }
}
