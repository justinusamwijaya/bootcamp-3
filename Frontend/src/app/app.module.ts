import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/Http";
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,RouterModule.forRoot([
      {path:"main",component:MainComponent},
      {path:"",component:LoginComponent},
      {path:"signup",component:SignupComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
