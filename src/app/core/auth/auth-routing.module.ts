import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
  {
    path:'login',
    canActivate:[LoginGuard],
    component:LoginComponent
  },
  {
    path:'register',
    canActivate:[LoginGuard],
    component:RegisterComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
