import { Component, OnInit } from '@angular/core';
import { Form, FormService } from './../services/form/form.service';
import { Register, RegisterService } from './../services/register/register.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  forms: Form[];
  registers: Register[];

  constructor(private formService: FormService, private registerService: RegisterService) { }

  ngOnInit() {
    this.formService.getForms().subscribe(res =>{
      this.forms = res;
    this.registerService.getRegisters().subscribe(res1 =>{
      this.registers = res1;
    })
    })
  }

  remove(item){
    this.formService.removeForm(item.id);
    this.registerService.removeRegister(item.id);
  }
}
