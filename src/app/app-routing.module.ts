import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
  {path:'', component: DefaultComponent},
  {path:'home', component: DefaultComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'logout/:sure', component: LoginComponent},
  {path:'**', component: DefaultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
