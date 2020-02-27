import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'form', loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)},
  { path: 'form/:id', loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)},
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
  { path: 'register/id', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
