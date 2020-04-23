import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { RegisterService, Register } from './../../services/register/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Form, FormService } from './../../services/form/form.service';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  register: Register = {
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    email: '',
    userType: ''
  }

  registers: Register[];

  forms: Form[];

  registerId: any;

  email: string;
  name: string;
  company: string;

  constructor(public navCtrl: NavController, private registerservice: RegisterService, private route: ActivatedRoute,
    private loadingController: LoadingController, public afAuth: AngularFireAuth, private formService: FormService,
    public router: Router) { }

  ngOnInit() {
    this.registerId = this.route.snapshot.params['id'];
    if (this.registerId){
      this.loadRegister();
    }
    this.registerservice.getRegisters().subscribe(res =>{
      this.registers = res;
  
    });

    this.retrieveData();
    this.formService.getForms().subscribe(res =>{
      this.forms = res;

    })
    
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
            this.company = val[i].company
          }
      }
    })
  }

  goToMsg(){
    this.router.navigateByUrl('menu/message')
  }
    
}
