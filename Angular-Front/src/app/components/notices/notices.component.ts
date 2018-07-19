import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Notices} from './notices';


@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {


  currentUserId:String;
  reqArray:Notices[];



  constructor(private authserveice:AuthService) { }

  ngOnInit() {

    this.getCurentUser();

  }



  getCurentUser(){

    this.authserveice.getProfile().subscribe(res=>{//as respond is return can subscribe to see the respond

      //now display following data inside profile.html


      this.currentUserId=res.user._id;


      this.getRequConfirmNotice();

      //   console.log(  this.currentUserId);

      //can pass user variable to the profile.html

      // console.log(res);

    });
  }



  getRequConfirmNotice(){

    //console.log(id);



    const id={
      id:this.currentUserId
    };


    this.authserveice.getRequConfirmNoticeServiced(id).subscribe(requests=>{


//console.log(requests);

      this.reqArray=requests;
      console.log(this.reqArray);







    });


  }


}
