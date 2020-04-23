import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { RegisterService, Register } from './../../services/register/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;

  languages: any = ['English', 'French'];
  paymentMethods: any = ['Paypal', 'Credit Card'];
  currencies: any = ['USD', 'LB', 'EUR'];

  register: Register = {
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    email: '',
    userType: ''
  }

  registers: Register[];

  registerId: any;

  email: string;
  name: string;

  constructor(public navCtrl: NavController, private registerservice: RegisterService, private route: ActivatedRoute,
    private loadingController: LoadingController, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.registerId = this.route.snapshot.params['id'];
    if (this.registerId){
      this.loadRegister();
    }
    this.registerservice.getRegisters().subscribe(res =>{
      this.registers = res;
  
    });

    this.retrieveData();
    
  }

  async loadRegister(){
    const loading = await this.loadingController.create({
      message: 'Loading Register..'
    });
    await loading.present();

    this.registerservice.getRegister(this.registerId).subscribe(res => {
      loading.dismiss();
      this.register = res;
    });
  }

  retrieveData(){
    this.registerservice.getRegisters().subscribe(val => 
    {
      for(let i=0; i < val.length; i++){
          if (val[i].email == this.afAuth.auth.currentUser.email){
            this.email = val[i].email
            this.name = val[i].name
          }
      }
    })   
  }


  editProfile() {
    this.navCtrl.navigateForward('edit-profil');
  }

  async logout() {
    this.navCtrl.navigateRoot('/');
    const res = await this.afAuth.auth.signOut();
  }

}
