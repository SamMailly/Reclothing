import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { RegisterService } from './services/register/register.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  email: string
  userType: string

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
    private registerservice: RegisterService
  ) {
    this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
        this.afAuth.authState.subscribe(auth => {
        
          if (!auth) {
              console.log('Not connected');
              this.router.navigateByUrl('/welcome')
              
          }else{
            console.log('Connected' + auth.uid);
      
          }
          //if(this.afAuth.auth.currentUser.email == this.email || this.userType == "Association"){
            
          //}
        });
        this.statusBar.styleDefault();
        this.splashScreen.hide();

    });
  }

  retrieveData(){
    this.registerservice.getRegisters().subscribe(val => 
    {
      for(let i=0; i < val.length; i++){
          if (val[i].email == this.afAuth.auth.currentUser.email)
            this.email = val[i].email
            this.userType = val[i].userType
        }
        
      })
}

}
