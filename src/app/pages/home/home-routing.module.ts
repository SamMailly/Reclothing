import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        children:[
          {
            path: '',
            loadChildren: () => import('../feed/feed.module').then( m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'notifications',
        children:[
          {
            path: '',
            loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
          }
        ]
      },
      {
        path: 'message',
        children:[
          {
            path: '',
            loadChildren: () => import('../message/message.module').then( m => m.MessagePageModule)
          }
        ]
      },

      {
        path: 'settings',
        children:[
          {
            path: '',
            loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'homeform',
        children:[
          {
            path: '',
            loadChildren: () => import('../homeform/homeform.module').then( m => m.HomeformPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}