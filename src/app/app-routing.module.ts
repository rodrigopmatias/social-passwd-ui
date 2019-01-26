import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { AlphabetFormComponent } from './alphabet-form/alphabet-form.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'alphabet', component: AlphabetComponent},
  {path: 'alphabet/form', component: AlphabetFormComponent},
  {path: 'alphabet/form/:uuid', component: AlphabetFormComponent},
  {path: 'service/form', component: ServiceFormComponent},
  {path: 'service/form/:uuid', component: ServiceFormComponent},
  {path: 'service/:uuid/keygen', component: PasswordGeneratorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
