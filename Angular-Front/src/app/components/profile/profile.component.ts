import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  status:String;


  username:String;
  name:String;
  adress:String;
  contact:String;
  occupation:String;
  skils:String;




  constructor(private authService:AuthService,private router:Router,private flashmessage:FlashMessagesService) { }

  ngOnInit() {
//need to call getProfile when load this profile component there for it goes under ngOnInit in the class
    this.authService.getProfile().subscribe(res=>{//as respond is return can subscribe to see the respond
      //now display following data inside profile.html
      this.user=res.user;
    //can pass user variable to the profile.html

 // console.log(res);

    });
  //at the same time load data here need to write a mthod to fetch profile data
  }

  deleteUsr(id){

    if(this.user.projectCount==0){
      this.authService.deleteUser(id).subscribe(res=>{
        this.user=res.user;



      });
    }
    else{
    this.flashmessage.show('can not delete your account as you are a member of a project ! ',{cssClass:'alert-danger',timeout:2000});

    }


  }

changestatustodisplayeditprofileform(){

    this.status="editprofile";


}

checkstatustodisplayeditprofile(){


    if(this.status=="editprofile"){


      return true;
    }

}

  updateprofile(id){

    const profiledetails={
      username:this.username,
      name:this.name,//need to create an object like this and then only can pass this value to backend
      adress:this.adress,

      skils:this.skils,
        contact:this.contact,
          occupation:this.occupation,
    };

    this.authService.updateprofile(id,profiledetails).subscribe(res => {
      //  console.log(res);
      this.router.navigate(['/dashboard']);

    });
  }

fieldvalidetor(){

    if(this.username==null || this.name==null || this.adress==null || this.contact==null || this.occupation==null || this.skils==null){


      return true;

    }


}







}
