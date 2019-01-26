import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { AppService } from './app.service';
import { ComputedService } from './computed.service';
import { AlphabetService } from './alphabet.service';

import { ServiceFormComponent } from './service-form/service-form.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { AlphabetFormComponent } from './alphabet-form/alphabet-form.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ServiceFormComponent,
    AlphabetComponent,
    AlphabetFormComponent,
    PasswordGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppService,
    ComputedService,
    AlphabetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
