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

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserEditProfileComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'login' , component:UserLoginComponent},
      {path: 'register' , component:UserRegisterComponent},
      {path: 'editprofile' , component:UserEditProfileComponent},
      {path: 'userprofile' , component:UserProfileComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
