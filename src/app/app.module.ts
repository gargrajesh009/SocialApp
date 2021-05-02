import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './home/profile/profile.component';
import { EditProfileComponent } from './home/edit-profile/edit-profile.component';
import { AddPhotoComponent } from './home/add-photo/add-photo.component';
import { FeedComponent } from './home/feed/feed.component';
import { TopbarComponent } from './home/topbar/topbar.component';
import { AppProfileComponent } from './home/app-profile/app-profile.component';
import {DatePipe} from '@angular/common';
import { CountsComponent } from './home/counts/counts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    EditProfileComponent,
    AddPhotoComponent,
    FeedComponent,
    TopbarComponent,
    AppProfileComponent,
    CountsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
