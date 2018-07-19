import { Injectable } from '@angular/core';
import{Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import{AuthService} from './auth.service';
import {createInjectable} from "@angular/compiler/src/core";

//from this service create an authguard to limited some pages to unautherize people.(ex:If request for the page profile by unauthorise person this makes it to redirect to home page or to login page)
@Injectable()

export class AuthGurd implements CanActivate{

  constructor(private auth:AuthService,private router:Router){

  }
  canActivate(){
  if(this.auth.loggedIn())
  {
    return true;

  }
  else
  {
    this.router.navigate(['unauthorized']);
    return false;

  }




  }

}
