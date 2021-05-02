import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPhotoComponent } from './home/add-photo/add-photo.component';
import { AuthGuard } from './authentication/auth.guard';
import { EditProfileComponent } from './home/edit-profile/edit-profile.component';
import { FeedComponent } from './home/feed/feed.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './home/profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TopbarComponent } from './home/topbar/topbar.component';
import { AppProfileComponent } from './home/app-profile/app-profile.component';
import { CountsComponent } from './home/counts/counts.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'profile',component:HomeComponent,canActivate:[AuthGuard],
  children:[
    {path:'',redirectTo:'feed',pathMatch:'full'},
    {path:'feed',component:FeedComponent},
    {path:'top',component:TopbarComponent},
    {path:'myProfile',component:ProfileComponent},
    {path:'addPic',component:AddPhotoComponent},
    {path:'editProfile',component:EditProfileComponent},
    {path:'appProfile',component:AppProfileComponent},
    {path:'count',component:CountsComponent}
  ]},
 
  {path:'',component:LoginComponent},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
