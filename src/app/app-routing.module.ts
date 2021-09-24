import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';


import { AuthGuard } from './services/auth.guard';
import { ContacsComponent } from './contacs/contacs.component';
import { BusinessOpportunityComponent } from './business-opportunity/business-opportunity.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'empresas', component: EnterprisesComponent, canActivate:[AuthGuard]},
  {path:'contactos', component: ContacsComponent, canActivate:[AuthGuard]},
  {path:'oportunidades-negocio', component: BusinessOpportunityComponent, canActivate:[AuthGuard]},
  {path:'**', component: DashboardComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
