import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomemessagePage } from './homemessage.page';

const routes: Routes = [
  {
    path: '',
    component: HomemessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomemessagePageRoutingModule {}
