import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagehome',
  templateUrl: './messagehome.page.html',
  styleUrls: ['./messagehome.page.scss'],
})
export class MessagehomePage implements OnInit { 

  constructor(public router: Router) {}

  ngOnInit() {

  }

  addRoom() {
    //this.navCtrl.navigateForward(AddroomPage);
    this.router.navigateByUrl("/addroom")
  }

  /*joinRoom(key) {
    this.navCtrl.navigateRoot("/message", {
      key:key,
      nickname:this.route.snpashot.paramget("nickname")
    });
  }*/

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};