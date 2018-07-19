import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../displayusers/user';
import {Memberprojectcount} from './memberprojectcount';
//import {ActivatedRoute,Params,Router} from '@angular/router';
import {Router} from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-searchmemberstoproject',
  templateUrl: './searchmemberstoproject.component.html',
  styleUrls: ['./searchmemberstoproject.component.css']
})


export class SearchmemberstoprojectComponent implements OnInit {
//importance of having .ts interface file -remove following comment and check
  // project:UserInter;

  users: User[];
  project: User;
  errorMessage: String;
  user: any;
  data:Memberprojectcount[]=[];//if need to use push() need to initialy equal to an empty array
  projectTitle: String;
  id:any[]=[];
  limitedIdSet:any[]=[];
 // lastID:any;
  currentUserId:String;
  constructor(private authservice: AuthService, private router: Router) {
  }

  ngOnInit() {
    //this.userstoproject();
    this.getCurentUser();
  }


  getCurentUser(){

    this.authservice.getProfile().subscribe(res=>{//as respond is return can subscribe to see the respond

      //now display following data inside profile.html


      this.currentUserId=res.user._id;



      //   console.log(  this.currentUserId);

      //can pass user variable to the profile.html

      // console.log(res);

    });
  }

  donotdisplayUser(id){

    if(id==this.currentUserId){
      return true;
    }


  }



  adduserstoarray(id) {

   // this.lastID=false;
    this.authservice.addUsersToProjectArray(id).subscribe(users => {
    //  this.data.push(users.name);
     // console.log(this.data);
   //   console.log(users.projectCount + 1);
      var name=users.name;
      var proCount=users.projectCount+1;
     // console.log(this.data);

      if(users.projectCount<3)
      {

        this.data.push({name:name,projectCount:proCount});
        this.id.push(users._id);

      }

      //this.lastID=true;
     // this.lastID=this.id[this.id.length-1];
     // console.log(this.id[this.id.length-1]);






  //    console.log(this.id);
      return true;

     // console.log(this.data[0]);
    }, error => this.errorMessage = <any>error);//if there is an error send any type of error message
  }







  returntruetodisablebutton(clickingid){
    var i=0;
    for(i;i<this.id.length;i++){

      if(clickingid==this.id[i])
      {     return true;

      }
    }
    }


  returntruetodisablebuttontolimitedprojcount(clickingid){
    var i=0;
    for(i;i<this.limitedIdSet.length;i++){

      if(clickingid==this.limitedIdSet[i])
      {     return true;

      }
    }
  }











  removeuserfromarray(name) {
    var i = 0;

    for (i; i < this.data.length; i++) {

      if (this.data[i].name == name) {
        this.data.splice(i,1);//here need to use 1 other wise from 1 cancel button will be all records delete
        this.id.splice(i,1);
      //  console.log(this.data);
      }
    }
  }


/*
  userstoproject() {

    this.authservice.serachuserstoproject().subscribe(users => {
      this.users = users;



      var i=0;
      for(i;i<this.users.length;i++){

        if(this.users[i].projectCount>2){
          this.limitedIdSet.push(this.users[i]._id);
        }

      }
   // console.log(this.limitedIdSet);



      //console.log(this.users);
      this.project = users.pop();//here need to pop cz then last element will be retrieve and also last element will be remove from the array.


      // this.project=users[users.length-1] if use this last element will be remain as it is eventhough assign to thethis.project then it will be a problem whwn looping throgh the array in .html cs it will print empty row in the table at the end

    }, error => this.errorMessage = <any>error);//if there is an error send any type of error message
  }*/

  createProjectMember() {
        var i=0;
          for(i;i<this.id.length;i++){
           // console.log(this.data[i].projectCount);

          this.increaseProjectCount(this.id[i],this.data[i].projectCount);


          }



    const memberProject = {
      projectTitle: this.project.projectTitle,
      dueDate:this.project.dueDate,
      note:this.project.note,
      projectmanger:this.project.projectmanger,
      members: this.data

    };

    this.authservice.addProjectMembers(memberProject).subscribe(res => {
      this.router.navigate(['/displaytaskstoproject']);
    });


  }


  increaseProjectCount(id,projectCount){

  const projcou={
    projectCount:projectCount//need to create an object like this and then only can pass this value to backend
  };

    this.authservice.updateprojectcount(id,projcou).subscribe(res => {
    //  console.log(res);

    });
  }






}
