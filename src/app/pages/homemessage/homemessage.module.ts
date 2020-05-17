import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomemessagePageRoutingModule } from './homemessage-routing.module';

import { HomemessagePage } from './homemessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomemessagePageRoutingModule
  ],
  declarations: [HomemessagePage]
})
export class HomemessagePageModule {}
