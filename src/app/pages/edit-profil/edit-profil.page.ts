import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { RegisterService, Register } from './../../services/register/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'


@Component({
  selector: 'app-edit-profil',
  templateUrl: 'edit-profil.page.html',
  styleUrls: ['edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {

  register: Register = {
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    email: '',
    userType: ''
  }

  registers: Register[];

  registerId: string;
  email: string;
  name: string;
  company: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private registerservice: RegisterService,
    public afAuth: AngularFireAuth,
    public route: ActivatedRoute
    ) { }

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
      const loading = await this.loadingCtrl.create({
        message: 'Loading Register..'
      });
      await loading.present();

      this.registerservice.getRegister(this.registerId).subscribe(res => {
        loading.dismiss();
        this.register = res;
      });
    }

    async sendData() {
      const loader = await this.loadingCtrl.create({
        duration: 2000
      });

      loader.present();
      loader.onWillDismiss().then(async l => {
        const toast = await this.toastCtrl.create({
          //showCloseButton: true,
          cssClass: 'bg-profile',
          message: 'Your Data was Edited!',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
      });
    }

    retrieveData(){
      this.registerservice.getRegisters().subscribe(val => 
      {
        for(let i=0; i < val.length; i++){
            if (val[i].email == this.afAuth.auth.currentUser.email){
              this.email = val[i].email
              this.name = val[i].name
              this.company = val[i].company
            }
        }
      })   
    }

}