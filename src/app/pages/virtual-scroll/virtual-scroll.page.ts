import {HttpClient} from '@angular/common/http';
import { Component } from "@angular/core";
import { Register, RegisterService } from './../../services/register/register.service';

@Component ({
     
    selector:"app-home",
    templateUrl: "Virtual-Scroll.page.html",
    styleUrls: ["Virtual-Scroll.page.scss"]
})

export class VirtualScrollPage {

register: Register = {
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    email: ''
    }
    users= [];
    page=0;
    maximumPages = 3;

    constructor(private http: HttpClient, private registerservice: RegisterService)  {
        this.loadUsers();

    }

    loadUsers() {
        this.registerservice.getRegisters()
        .subscribe(res => {
             console.log(res);
             this.users = res ['results'].sort((a,b) => { 
                 if(a.name.last < b.name.last) {
                     return -1
                 }
                 if (a.name.last > b.name.last) {
                     return 1;
                 }
                 return 0;
                });
                console.log(this.users);
        });

    }

    seperateLetter(record,recordIndex, records){
        if (recordIndex == 0) {
            return record.name.last[0].toUpperCase();
        }

        let first_prev=records[recordIndex-1].name[0];
        let first_current= record.name[0];

        if (first_prev != first_current) {
            return first_current.toUpperCase();
        }
        return null
    }
}
