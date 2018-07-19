import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}from '@angular/forms';//this is need to to be here if this is not post and get methods will not work and give each data as GET data(display wth url)
import{RouterModule,Routes} from '@angular/router';//RouterModule,Routes imported from angular router
import { FlashMessagesModule } from 'angular2-flash-messages';//This is manually installed and need to import manualy this should mention in imports.
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';//here definitly need to import file the class FlashMessagesService is in and this should be mention under providers


//All the installed modules,created components,services need to import here.and mention under particular providers/imports

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';//this is new component that made
import { ProfileComponent } from './components/profile/profile.component';

import {AuthService} from './service/auth.service'; //this need to import manually becuse this is a service.we need to import here class that is inside auth.service.ts-AuthService class
import { HttpModule } from '@angular/http';
import {AuthGurd} from './service/auth.gurd';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { DisplayusersComponent } from './components/displayusers/displayusers.component';

import { UpdateusersComponent } from './components/updateusers/updateusers.component';

import { SearchmemberstoprojectComponent } from './components/searchmemberstoproject/searchmemberstoproject.component';


import { SearchmemberstotasksComponent } from './components/searchmemberstotasks/searchmemberstotasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisplayRequestsComponent } from './components/display-requests/display-requests.component';
import { NoticesComponent } from './components/notices/notices.component';
import { CreatedbymeComponent } from './components/createdbyme/createdbyme.component';
import { ProjectComponent } from './components/project/project.component';
import { MembersincreatedprojectComponent } from './components/membersincreatedproject/membersincreatedproject.component';

import { OngoinprojectsComponent } from './components/ongoinprojects/ongoinprojects.component';
import { MytasksComponent } from './components/mytasks/mytasks.component';

//import { MatTooltip } from '@angular/material';




//here writing all the routes to an aray variable'
const applicationRoutes:Routes=[
//if the path (url) is ' localhost:4200/login' run login component
  {path:'',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGurd]},//this says how to gurd a route
  {path:'createaproject',component:CreateProjectComponent,canActivate:[AuthGurd]},                               //if need to gurd some route need to put canActivate:[AuthGurd] it here like this in the path affter component ,as here affter the profile component,from having a gurd like this when accesing profile withot authentication will direct to the root url(home page)
  {path:'displayusers',component:DisplayusersComponent ,canActivate:[AuthGurd]},                                                        //if need to gurd some route need to put canActivate:[AuthGurd] it here like this in the path affter component ,as here affter the profile component,from having a gurd like this when accesing profile withot authentication will direct to the root url(home page)
  {path:'updateusers/:id',component:UpdateusersComponent,canActivate:[AuthGurd]},
  {path:'showuser/:id',component:SearchmemberstoprojectComponent,canActivate:[AuthGurd]},
  {path:'serchmemberstoproject',component:SearchmemberstoprojectComponent,canActivate:[AuthGurd]},

  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGurd]},
  {path:'requests',component:DisplayRequestsComponent,canActivate:[AuthGurd]},
  {path:'notifications',component:NoticesComponent,canActivate:[AuthGurd]},
  {path:'createdbymeprojects',component:CreatedbymeComponent,canActivate:[AuthGurd]},
  {path:'ongoinprojects',component:OngoinprojectsComponent,canActivate:[AuthGurd]},
  {path:'mytasks',component:MytasksComponent,canActivate:[AuthGurd]}



];//inside this have all the routes objects






@NgModule({
  declarations: [
    AppComponent,//also new component here inserted into the declarations
    NavbarComponent, LoginComponent, RegisterComponent, ProfileComponent, CreateProjectComponent, DisplayusersComponent, UpdateusersComponent, SearchmemberstoprojectComponent, SearchmemberstotasksComponent, DashboardComponent, FooterComponent, DisplayRequestsComponent, NoticesComponent, CreatedbymeComponent, ProjectComponent, MembersincreatedprojectComponent, OngoinprojectsComponent, MytasksComponent,  //when creates a component need to import it to app.module.ts and need to include it in declaration but as this has a angular command prompt this will happen automatically
  ],
  imports: [
    BrowserModule,//all the imported modules should be put inside imports(manually)
    RouterModule.forRoot(applicationRoutes), //need to put this here as this is a module that imported and also need to specify routes that need to run for roots-here applicationRoutes should run for root
    //imported module put here
    HttpModule,
    FormsModule,
    FlashMessagesModule,

  ],
  providers: [AuthService,FlashMessagesService,AuthGurd],//if we  use any service need to put it in to providers,we can generate services through cmd but as others cmd will not automatically put services into providers need to do that manually.
  bootstrap: [AppComponent]//at the start of the development server(localhost:4200) always it looks for app.component,ts and that data will be load to the index.html
})
export class AppModule { }
//if creating a component no need to add manualy but if it is a service need to add it manualy
