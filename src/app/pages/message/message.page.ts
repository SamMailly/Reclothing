import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, Message } from './../../services/message/message.service';
import { RegisterService, Register } from './../../services/register/register.service';
import { LoadingController, IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
//import { EventListener } from '';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  message: Message = {
    name: '',
    userId: '',
    text: '',
    date: new Date()
  }

  messages: Message[]

  messageId: null;

  registers: Register[];

  email: string;

  @ViewChild(IonContent, {static: false}) content: IonContent;

  
  constructor( private messageservice: MessageService, private loadingController: LoadingController, private route: ActivatedRoute,
     public afAuth: AngularFireAuth, private registerservice: RegisterService, private db: AngularFirestore) {
        
      }

  ngOnInit() {
    this.messageId = this.route.snapshot.params['id'];
  if (this.messageId){
    this.loadMessage();
  }
  this.messageservice.getMessages().subscribe(res =>{
    this.messages = res;

  });
}


async loadMessage(){
  const loading = await this.loadingController.create({
    message: 'Loading Message..'
  });
  await loading.present();
 
  this.messageservice.getMessage(this.messageId).subscribe(res => {
    loading.dismiss();
    this.message = res;
  });
}

async loadRegister(){
  const loading = await this.loadingController.create({
    message: 'Loading Message..'
  });
  await loading.present();
 
  this.messageservice.getMessage(this.messageId).subscribe(res => {
    loading.dismiss();
    this.message = res;
  });
}

    
  /*.catch((err) => {
    console.log('Error getting documents', err);
  });*/
     /* map(actions => {
        return actions.map(a => {
          const name = a.name;
          const email = a.email;
          console.log(name, email)
          return { email, name };
          
        });
      })
    );
    })
  );*/
//}
    retrieveData(){
      var arrayObj: any;
      //for(let i=0; i< this.db.collection('register').valueChanges().subscribe.length; i++){
      this.registerservice.getRegisters().subscribe(val => 
      {
        for(let i=0; i < val.length; i++){
            if (val[i].email == this.message.name)
              this.email = val[i].email
              console.log(this.email)
          }
          
        })   
      
      
        /*this.registers = this.db.collection('register').valueChanges().subscribe[i]
        console.log("toto" + this.db.collection('register').valueChanges().subscribe)
        this.registers.filter((x) => {
          if(x.email === this.afAuth.auth.currentUser.email)
            this.email = x.email
          })
          
        }*/
  
    
  }

  async sendMessage() {
    const entreredMessage = (<HTMLInputElement>document.getElementById("input-text")).value;
    this.message.date.getDate()
    this.message.userId = this.afAuth.auth.currentUser.uid
    this.message.name = this.afAuth.auth.currentUser.email
    this.retrieveData()
    /*this.db.('registers')
    .then(
      ((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      })*/
    //var toto: Observable<Register[]> = null;
    /*toto = this.retrieveData()
    for(let i=0; this.registerservice.length(); i++){
      if (this.afAuth.auth.currentUser.email == this.registers.email){
        this.message.name = this.registers.name
      }else{
        console.log("didn't match")
      }
    }*/
    
    
    if(entreredMessage.trim().length <= 0){
        this.presentAlert();
    }else{
    const loading = await this.loadingController.create({
      message: 'Sending Message..'
    });
    await loading.present();
    if (this.messageId){
      this.messageservice.updateMessage(this.message, this.messageId).then(() =>{
        loading.dismiss();
        //this.nav.back('home');
      });
    } else{
      this.messageservice.addMessage(this.message).then(() =>{
        loading.dismiss();
        //this.nav.back('home');
      });
    }
    this.confirmAlert();
    }
    this.message.text = '';
    this.content.scrollToBottom(200);
  }

  async confirmAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Success';
    alert.message = 'Message Sent';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.subHeader = 'Invalid inputs';
    alert.message = 'Message cannot be empty!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

   remove(item){
    this.messageservice.removeMessage(item.id);
  }




  /*checkUser(){
    var user = this.afAuth.auth.currentUser;
    this.afAuth.authState.subscribe(auth => {
        
      if (!auth) {
        console.log('Not connected');
      
    } else {
      console.log('Connected' + auth.uid);
      console.log(user.displayName);
      console.log(user.email);
      }
    });
  }*/
}