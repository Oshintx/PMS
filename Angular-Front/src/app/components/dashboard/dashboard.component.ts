import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import {User} from '../displayusers/user';
import {Projmember} from "./projmember";
import {Project} from "./project";
import {Circlemembers} from "./circlemembers";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  us:any;
  projtitles:Projmember[]=[];
  currentDate:String;
  ongoinprojects:Projmember[]=[];
  mycircle:Circlemembers[]=[];
  remainingDaysPercentage:Number;


  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.getCurentUser();
   // this.getCurrentDate();
  // this.getAllProjects();


  }

 // users:User[]=[];

/*
  getCurrentDate(){


    this.authservice.getCurrentDateService().subscribe(res=>{//as respond is return can subscribe to see the respond

      //now display following data inside profile.html

      this.currentDate=res.today;


      console.log(res);

      //can pass user variable to the profile.html

      // console.log(res);

    });




  }
*/


getCurentUser(){

  this.authservice.getProfile().subscribe(res=>{
    this.us=res.user;

    const email={
      email:this.us.email
    }

    const currentuid = {
      id: this.us._id
    }

    this.authservice.getAllProjects(email).subscribe(res=>{
      this.projtitles=res;
      });
    this.authservice.getOnGoinProjects(email).subscribe(res=>{
      this.ongoinprojects=res;
    });


    this.authservice.serachuserstoproject(currentuid).subscribe(users => {

      this.mycircle=users.membersincircle;//TODO defenitly need to call the array name here other wise array elelments will not get

  //    console.log( this.mycircle)

    });
    });
}
  validateRemainingdays(remainingdays){

   if(remainingdays<0){
     return true;

   }

  }
  handleDeadLinesDanger(remainingdays){


  if(remainingdays<=30){
    return true;
  }

  }
  handleDeadLinesWarn(remainingdays){
    if(remainingdays>30 && remainingdays<=60 ){
      return true;
    }
    }
  handleDeadLinesSuccess(remainingdays){


    this.remainingDaysPercentage=remainingdays;

    if(remainingdays>60 ){
      return true;
    }
  }
/*


  userstoproject() {

    const currentuid = {
      id: this.projectmangerID
    }


    this.authservice.serachuserstoproject(currentuid).subscribe(users => {

      this.mycircle=users.membersincircle;//TODO defenitly need to call the array name here other wise array elelments will not get
      console.log(this.mycircle);


    });


  }
*/



//checkOngoinProject









}
