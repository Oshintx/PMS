import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {Project} from "../dashboard/project";
import {Members} from "../createdbyme/members";
import {Tasks} from "../createdbyme/tasks";
import {Mycircle} from '../create-project/mycircle';
import {Memberprojectcount} from "../createdbyme/memberprojectcount";
@Component({
  selector: 'app-createdbyme',
  templateUrl: './createdbyme.component.html',
  styleUrls: ['./createdbyme.component.css']
})
export class CreatedbymeComponent implements OnInit {



  projects:Project[]=[];
  memberstoproj:Members[]=[];
  projectmangerID:String;
  status:String;
  mycircle:Mycircle[]=[];
  tasksarray:Tasks[]=[];
  taskmemberarray:String[]=[];
  us:any;
  data:Memberprojectcount[]=[];
  id:any[]=[];
  projectID:String;

  dueDate:String;
  startDate:String;
  projectIdToBeUpdate:String;
  note:String;
 // flashIncorrect2:boolean;

  //createdProjectCount:Number;
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit() {

    this.getCurentUser()

  }







  getCurentUser(){

    this.authservice.getProfile().subscribe(res=>{
      this.us=res.user;
     this.projectmangerID=this.us._id;







        this.getCreatedProjects(this.us.email);
      this.userstoproject()



    });





  }




  getCreatedProjects(email){



    const projectmanager={
      projectmanager:email
    }


    this.authservice.getCreatedProjectsService(projectmanager).subscribe(res=>{

      // console.log(res);
      this.projects=res;

    //this.createdProjectCount=this.projects.length;





    });


  }


  members(projectID){

    this.authservice.serachtaskstoproject(projectID).subscribe(users=>{

      //   this.usertotask=users.members;
      //console.log(users.members[0]);

      this.memberstoproj=users.members;
    console.log(projectID);
    this.projectID=projectID;
    this.status="true";



    });

  }
  tasks(projectTitle){

    this.authservice.tasks(projectTitle).subscribe(tasks=>{

      //   this.usertotask=users.members;
      //console.log(users.members[0]);

    //  this.memberstoproj=users.members;
      //  console.log(this.memberstoproj[0]);

      //this.status="true";



  this.tasksarray=tasks.tasks;
     // console.log(tasks.tasks);
  this.status="tasks"


    });

  }


  checkstatustodisplaytasks(){
    if(this.status=="tasks"){

      return true;
    }

  }








  checstatustodisplaymembers(){
    if(this.status=="true"){

      return true;
    }

  }



  userstoproject() {

    const currentuid = {
      id: this.projectmangerID
    }


    this.authservice.serachuserstoproject(currentuid).subscribe(users => {

      this.mycircle=users.membersincircle;//TODO defenitly need to call the array name here other wise array elelments will not get
       console.log(this.mycircle);


    });


  }


  adduserstoarray(id,name,email,projectcount) {


      var name=name;
      var proCount=projectcount+1;

      if(projectcount<3)
      {

        this.data.push({name:name,projectCount:proCount,email:email});//TODO continue
        this.id.push(id);
        //console.log(this.id);


      }

      console.log(this.data);


      return true;
      }


  createIntermediateProjectMember() {



    const memberProject = {

      projectID:this.projectID,
      memberarray:this.data

    };


    console.log(memberProject);


    this.authservice.addrandomMembersToProject(memberProject).subscribe(res => {
      this.router.navigate(['/dashboard']);
    });



  }





  changestatustoaddmembers(){

    this.status="addmembers";



  }

  checkstatustoaddmembers(){
    if(this.status=="addmembers"){

      return true;
    }

  }


checkstatustodisplaytaskmembers(){

    if( this.status=="tasksmembers"){

      return true;

    }
}

  changestatustodisplaytaskmembers(members){
    this.taskmemberarray=members;
    this.status="tasksmembers";
  }

  changestatustofalse(){
    this.status="false";
    }


changestatustoupdatedates(id){

    this.status="updatedates";
  this.projectIdToBeUpdate=id;
  console.log(this.projectIdToBeUpdate);


}


checkstatustodisplayupdatedatepage(){

    if(this.status=="updatedates"){

      return true;

    }

}



updatedates(){

    const projdates={
      note:this.note,
      dueDate:this.dueDate,//need to create an object like this and then only can pass this value to backend
      startDate:this.startDate,

    };

    this.authservice.updateDates(this.projectIdToBeUpdate,projdates).subscribe(res => {
      //  console.log(res);
     // this.flashIncorrect2=true;

      this.router.navigate(['/dashboard']);


      //   this.changestatustofalse();
    });
  }



avoidupdate(){

    if(this.dueDate==null||this.startDate==null || this.note==null){
          return true;


    }


}











}
