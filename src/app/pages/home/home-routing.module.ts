import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule'},
      { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsPageModule'},
      { path: 'message', loadChildren: '../message/message.module#MessagePageModule'},
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule'},
      { path: 'homeform', loadChildren: '../homeform/homeform.module#HomeformPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}