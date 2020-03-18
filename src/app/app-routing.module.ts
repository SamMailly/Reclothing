import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomePage } from './pages/welcome/welcome.page';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'form', loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)},
  { path: 'form/:id', loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)},
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
  { path: 'register/:id', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'feed', loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule)},
  //{ path: 'notifications', loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)},
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)},
  { path: 'message', loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)},
  { path: 'homeform', loadChildren: () => import('./pages/homeform/homeform.module').then( m => m.HomeformPageModule)},
  {
    path: 'data-table',
    loadChildren: () => import('./pages/data-table/data-table.module').then( m => m.DataTablePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
