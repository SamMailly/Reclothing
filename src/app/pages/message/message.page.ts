import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MessageService, Message } from './../../services/message/message.service';
import { RegisterService, Register } from './../../services/register/register.service';
import { LoadingController, IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { database } from 'firebase';

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
    date: ''
  }

  messages: Message[]

  messageId: null;

  registers: Register[];

  email: string;

  createdAt: Date;


  @ViewChild(IonContent, {static: false}) content: IonContent;

  
  constructor( private messageservice: MessageService, private loadingController: LoadingController, private route: ActivatedRoute,
     public afAuth: AngularFireAuth, private registerservice: RegisterService, private db: AngularFirestore,
     ) {     
       
      }

  ngOnInit() {
    this.messageId = this.route.snapshot.params['id'];
  if (this.messageId){
    this.loadMessage();
  }
  this.messageservice.getMessages().subscribe(res =>{
    this.messages = res;
    this.message.name = this.afAuth.auth.currentUser.email
    this.retrieveData()
    this.sortByDate()

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
    retrieveData(){
      this.registerservice.getRegisters().subscribe(val => 
      {
        for(let i=0; i < val.length; i++){
            if (val[i].email == this.message.name)
              this.email = val[i].email
          }
          
        })
  }
   
    sortByDate(){
      this.messages.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      console.log(this.messages)
    }

  async sendMessage() {
    const entreredMessage = (<HTMLInputElement>document.getElementById("input-text")).value;
    const date= new Date()
    var todayYear = date.getFullYear()
    var month = date.getMonth() + 1
    var todayMonth = (month < 10 ? '0' : '') + month
    // if(new Date().getMonth()+1 < 10)
    //   todayMonth = '0'+ todayMonth
    var todayDay = (date.getDate() < 10 ? '0' : '') + date.getDate()
    // if(new Date().getDate() < 10)
    //   todayDay = '0'+ todayDay 
    var todayHour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    //if(new Date().getHours() < 10)
    //  todayHour = '0' + todayHour
    var todayMin = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    //if (new Date().getMinutes() < 10)
    //  todayMin = '0' + todayMin
    var todaySec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
    //if (new Date().getSeconds() < 10)
    //  todaySec = '0' + todaySec
    var datetoday = todayYear+'-'+todayMonth+'-'+todayDay+'T'+todayHour+
    ':'+todayMin+':'+todaySec

    this.message.date = datetoday
    this.message.userId = this.afAuth.auth.currentUser.uid    
    
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

}