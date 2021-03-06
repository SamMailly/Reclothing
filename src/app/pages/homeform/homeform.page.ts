import { Component, OnInit } from '@angular/core';
import { Form, FormService } from './../../services/form/form.service';


@Component({
  selector: 'app-homeform',
  templateUrl: './homeform.page.html',
  styleUrls: ['./homeform.page.scss'],
})
export class HomeformPage implements OnInit {
  forms: Form[];


  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formService.getForms().subscribe(res =>{
      this.forms = res;
    })
  }

  remove(item){
    this.formService.removeForm(item.id);
  }

}
