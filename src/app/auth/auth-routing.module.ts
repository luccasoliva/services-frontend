import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {Title} from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: "Site ServicesFrontend- Squad02 "
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
    title: "Site ServicesFrontend- Squad02 "
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
