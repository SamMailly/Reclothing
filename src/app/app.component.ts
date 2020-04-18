import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
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
        });
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        this.platform.ready().then(() => {
          // 'hybrid' detects both Cordova and Capacitor
          if (this.platform.is('hybrid')) {
            // make your native API calls
          } else {
            // fallback to browser APIs
          }
        });
    });
  }
}
