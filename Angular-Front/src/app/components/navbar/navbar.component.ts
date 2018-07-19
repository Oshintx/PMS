//navabar.component.html file is completely handle by this.
//to load router inside html navabar.component.html file need to import(Load ) the router

import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import{AuthService} from '../../service/auth.service';//import authservice class there for need to register inside constructor
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  us:any;

//inside constructor need to register each feture or modules that importes.
  constructor(private router:Router,private authservice:AuthService,private flashMessages:FlashMessagesService) {//Here Router is above define Router and router  can be use in navbar html now as this is inside constructor.
    }

  ngOnInit() {


    this.authservice.getProfile().subscribe(res=>{//as respond is return can subscribe to see the respond
      //now display following data inside profile.html
      this.us=res.user;
      //can pass user variable to the profile.html

      // console.log(res);

    });





  }

  logoutUser()//need to send this request to back end through auth service(need to  put this to authservice) there for need to import authservice.
  {
    this.authservice.logout();  //this log out function inside the authservice as all the requests in front end handle by authservice
    this.flashMessages.show('You are logged out!', {cssClass: 'alert-success', timeout: 600});//message-You are registered!,alert-alert-success,timeTakenToDisplay-3000msec-3sec

    this.router.navigate(['/login']);//affter log out this will navigate to log out
    return false;

  }

}
//This log out function is inside the authservice.cz all the requests handle by authservice.which means all the front end data send to the server inside authservice.to send this log out request to backend there is a log out method inside authservice.that will be call here.
