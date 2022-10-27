import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UserRegisterComponent } from './register/user-register/user-register.component';
import { UserEditProfileComponent } from './editProfile/user-edit-profile/user-edit-profile.component';
import { UserProfileComponent } from './userProfile/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//mat
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Subscription } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserEditProfileComponent,
    UserProfileComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'login' , component:UserLoginComponent},
      {path: 'register' , component:UserRegisterComponent},
      {path: 'editprofile' , component:UserEditProfileComponent},
      {path: 'userprofile' , component:UserProfileComponent},
    ]),
    MatInputModule,
    MatButtonModule
  ],
  providers: [FormControl,XMLHttpRequest],
  bootstrap: [AppComponent]
})
export class AppModule { }
