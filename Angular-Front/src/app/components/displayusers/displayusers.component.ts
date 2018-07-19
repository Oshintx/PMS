import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import {StringifyOptions} from "querystring";
import {User} from './user';
import {Userrequest} from './userrequest';
import {Sentrequests} from './sentrequests';
import {Router} from '@angular/router';

@Component({
  selector: 'app-displayusers',
  templateUrl: './displayusers.component.html',
  styleUrls: ['./displayusers.component.css']
})
export class DisplayusersComponent implements OnInit {

  request:Userrequest[]=[];
  idTo:StringifyOptions[]=[];
  currentUser:String;
  currentuserId:String;
  sentrequests:Sentrequests[]=[];
  sentRequestsToEmail:String[]=[];
  users:User;
  membersInCircle:any[]=[];
  sentRequests:any[]=[];
  memberEmailsInCircle:String[]=[];

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.checkCurrentUser();
    this.getAllUsers();
    }
  getAllUsers(){
  this.authservice.getUsers().subscribe(users=>{

    this.users=users;
    });
  }
  addRequeststoArray(tonName,toEmail,id) {
    this.authservice.getProfile().subscribe(res=>{
      this.request.push({fromName:res.user.name,fromEmail:res.user.email,tonName:tonName,toEmail:toEmail,status:"false"});
      this.idTo.push(id);
      this.sentrequests.push({tonName:tonName,toEmail:toEmail,status:"false"});
      });
    }
    checkCurrentUser(){
    this.authservice.getProfile().subscribe(res=>{
      this.currentUser=res.user.email;
      this.currentuserId=res.user._id;
     this.membersInCircle=res.user.membersincircle;
     for(var i=0;i<this.membersInCircle.length;i++){
       this.memberEmailsInCircle.push(this.membersInCircle[i].email);
     }
     this.sentRequests=res.user.sentrequests;
      console.log(this.sentRequests.length
      );

     });
    }
    confirmRequest(){
    const usersequsets = {
      requests: this.request,
      id: this.idTo,
      sentid:this.currentuserId,
      sentrequests:this.sentrequests
    };
    this.authservice.sendRequests(usersequsets).subscribe(res => {
      console.log(res);
      this.router.navigate(['/dashboard']);
      });
    }
  donotdisplayUser(email){
    if(email==this.currentUser){//TODO -here pass the email
      return true;
    }
  }
  returntruetoRemoverequestsSentUsers(clickingid){
    var i=0;
    for(i;i<this.request.length;i++){

      if(clickingid==this.idTo[i])
      {     return true;

      }
    }
  }
  validateSendRequestsToSelectedButton(){
    for(var i=0;i<this.request.length;i++){
      if(this.request[i]!=null){
        return true;
      }
    }

  }
  donotDisplayMembersInCircle(clickingEmail){
    for(var i=0;i<this.memberEmailsInCircle.length;i++){
      if(clickingEmail==this.memberEmailsInCircle[i]){

        return true;
      }
    }
  }
  donotDisplayMembersInSentRequests(clickingEmail){
    for(var i=0;i<this.sentRequests.length;i++){
      if(clickingEmail==this.sentRequests[i].toEmail){
        return true;
      }
    }
  }
}
