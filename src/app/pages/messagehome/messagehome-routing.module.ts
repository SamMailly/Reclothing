import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagehomePage } from './messagehome.page';

const routes: Routes = [
  {
    path: '',
    component: MessagehomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagehomePageRoutingModule {}
