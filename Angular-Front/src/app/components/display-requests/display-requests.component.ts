import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Request} from './request';




@Component({
  selector: 'app-display-requests',
  templateUrl: './display-requests.component.html',
  styleUrls: ['./display-requests.component.css']
})
export class DisplayRequestsComponent implements OnInit {
currentUserId:String;
reqArray:Request[];



  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.getCurentUser();






  }

  getCurentUser(){

    this.authservice.getProfile().subscribe(res=>{//as respond is return can subscribe to see the respond

      //now display following data inside profile.html


      this.currentUserId=res.user._id;


      this.getRequ();

   //   console.log(  this.currentUserId);

      //can pass user variable to the profile.html

      // console.log(res);

    });
  }


  getRequ(){

    //console.log(id);



    const id={
      id:this.currentUserId
    };


    this.authservice.getRequests(id).subscribe(requests=>{


//console.log(requests);

      this.reqArray=requests;

     //   console.log(this.reqArray[0]);







    });


  }


confirmRequest(fromEmail,toEmail){

    const email={
      fromEmail:fromEmail,
      toEmail:toEmail,
      id:this.currentUserId
    };

  this.authservice.confirmRequestservice(email).subscribe(res=>{

  //   console.log(res);



  });


 this.removeRequestFromTheArray(fromEmail);//need to put this out side above subscribe otherwise will not give an out put

}



removeRequestFromTheArray(fromEmail){

    var i=0;

    for(i;i<this.reqArray.length;i++){

      if(this.reqArray[i].fromEmail==fromEmail){

   //   console.log("hai");
    //    console.log(this.reqArray[i].fromEmail);
       this.reqArray.splice(i,1);

      }


    }





}










}
