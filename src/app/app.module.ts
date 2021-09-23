import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { GuestsComponent } from './guests/guests.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ContacsComponent } from './contacs/contacs.component';
import { BusinessOpportunityComponent } from './business-opportunity/business-opportunity.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SignupComponent,
        LoginComponent,
        DashboardComponent,
        EnterprisesComponent,
        GuestsComponent,
        ContacsComponent,
        BusinessOpportunityComponent,
       
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AngularFirestoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
