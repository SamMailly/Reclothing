import { Component, OnInit, ElementRef,  ViewChild} from '@angular/core';
import { IonList, IonContent } from '@ionic/angular';
import { RegisterService } from './../../services/register/register.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../component/popover/popover.component';



@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  @ViewChild(IonList, {static : false}) list : ElementRef;
  @ViewChild(IonContent, {static : false}) content:IonContent;

    arr =  [];

    block = 'end';
    behaviour = 'smooth';

    scrollTo = null;

    emails = [];

    constructor(private registerservice: RegisterService, public afAuth: AngularFireAuth,
      public popoverController: PopoverController){
    
          
        /*for(let val = 0; val < 100 ; val ++){
            this.arr.push(`Element - ${val}`)
        }*/
    }

    ngOnInit() {
      this.registerservice.getRegisters().subscribe(val => 
        {
          for(let i=0; i < val.length; i++){
              this.arr.push(`Nom: ${val[i].name},\n` + `Email: ${val[i].email}`)
            }
              console.log(this.arr)
        })

    }

    scrollListVisible(){
        console.log('scroll to:', this.scrollTo);
        let arr = this.list.nativeElement.children;
        let item = arr[this.scrollTo];
        item.scroolIntoView({ behaviour: this.behaviour, block: this.block});

    }
    
    scrollBottom(){
        this.content.scrollToBottom();
    }

    scrollTop(){
        this.content.scrollToTop();
    }

    async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: ev,
        translucent: true
      });
      return await popover.present();
    }
  
}
