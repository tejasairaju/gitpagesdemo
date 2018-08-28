import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent, AdminComponent, HomeComponent,
    LoginComponent, NoAccessComponent, SignupComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'admin', component: AdminComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  providers: [AuthService, OrderService, 

    // For creating a mock back-end. You don't need these in a real app. 
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
