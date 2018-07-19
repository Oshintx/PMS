import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {Memberprojectcount} from './memberprojectcount';
import {Project} from './project';
import {Task} from './task';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Mycircle} from './mycircle';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  user: any;
  projectTitle: String;
  dueDate: Date;
  startDate:Date;
  note: String;
  projectmanger: String;

  taskTitle:String;
  taskDueDate:Date;
  taskStartDate:Date;
  taskWeight:String;
  extraDetails:String;
  members:String[]=[];

  membershelpertodisplay:String[]=[];
  currentCreatedProject:Project;//TODO continue from here
  btnstatus: String;
  mycircle:any[]=[];
  data:Memberprojectcount[]=[];
  id:any[]=[];
  projectmangerID:String;
  projectID:Number;
  tasksArray:Task[]=[];
  limitedIdSet:any[]=[];


  constructor(private authService: AuthService, private router: Router,private flashMessages:FlashMessagesService) {}

  ngOnInit() {
    this.getProjectManager();
    this.generateprojectid();

    }


  getProjectManager() {

    this.authService.getProfile().subscribe(res => {//as respond is return can subscribe to see the respond
      //now display following data inside profile.html
      this.user = res.user;
      this.projectmanger=this.user.email;
      this.projectmangerID=this.user._id;
     // console.log( this.user.name);
      //can pass user variable to the profile.html

      // console.log(res);
      this.userstoproject();
      });


  }


  createProject() {

    if(this.dueDate<this.startDate){
      this.flashMessages.show('Project Due Date Can Not Be Before The Start Date!', {cssClass: 'alert-danger', timeout: 1500});
      }else {
      const project = {
        projectID: this.projectID,
        projectTitle: this.projectTitle,
        dueDate: this.dueDate,
        startDate: this.startDate,
        note: this.note,
        projectmanger: this.projectmanger
      };
      console.log(project);
      this.authService.addProject(project).subscribe(res => {
        //this.router.navigate(['/serchmemberstoproject']);
        this.currentCreatedProject = res;
      //  console.log(this.currentCreatedProject);
        this.btnstatus = "true";


      });
    }

  }


  generateprojectid(){

    this.authService.getprojectcount().subscribe(projectcount => {
      this.projectID=projectcount+1;



      });
    }




  checkbtnstatus() {

    if (this.btnstatus == "true") {

      return true;

    }


  }


  userstoproject() {

    const currentuid = {
      id: this.projectmangerID
    }
    this.authService.serachuserstoproject(currentuid).subscribe(users => {

      this.mycircle=users.membersincircle;//TODO defenitly need to call the array name here other wise array elelments will not get

      for(var i=0;i<this.mycircle.length;i++){

        if(this.mycircle[i].projectCount>2){
          this.limitedIdSet.push(this.mycircle[i]._id);
        }

      }

    });


  }


  returntruetoRemoveProjectSetUser(clickingid){

    for(var i=0;i<this.id.length;i++){

      if(clickingid==this.id[i])
      {     return true;

      }
    }
  }
  validateProjectLimit(clickingid){
    var i=0;
    for(i;i<this.limitedIdSet.length;i++){

      if(clickingid==this.limitedIdSet[i])
      {     return true;

      }
    }
  }



  adduserstoarray(id) {

    this.authService.addUsersToProjectArray(id).subscribe(users => {
      var email=users.email;
      var name=users.name;
      var proCount=users.projectCount+1;
      if(users.projectCount<3)
      {
        this.data.push({email:email,name:name,projectCount:proCount});//TODO continue
        this.id.push(users._id);
        //console.log(this.id);
      }
      return true;
      });
    }

  validateAddSelectedMembersButton(){
       for(var i=0;i<this.id.length;i++){
         if(this.id[i]!=null){
           return true;
         }
       }
    }
    createProjectMember() {

    var i=0;
    for(i;i<this.id.length;i++){
      this.increaseProjectCount(this.id[i],this.data[i].projectCount,this.data[i].name);
      }

    const memberProject = {
      projectID:this.projectID,
      projectTitle: this.projectTitle,
      dueDate:this.dueDate,
      startDate:this.startDate,
      note:this.note,
      projectmanger:this.projectmanger,
      members: this.data

    };


 //   console.log(this.data);


    this.authService.addProjectMembers(memberProject).subscribe(res => {
      //this.router.navigate(['/displaytaskstoproject']);     //TODO task 1

        this.btnstatus="tasks";



      });



  }

  increaseProjectCount(id,projectCount,name){

    const projcou={
      projectCount:projectCount,//need to create an object like this and then only can pass this value to backend
      id:this.projectmangerID,
      name:name


    };

    this.authService.updateprojectcount(id,projcou).subscribe(res => {
      //  console.log(res);

    });
  }


  checkbtntochangeformtomembers(){
    if(this.btnstatus=="tasks"){

      return true;
    }



  }



  addTasksToArray(){


    const taskarrayobject={
      taskTitle:this.taskTitle,
      taskDueDate:this.taskDueDate,
      taskStartDate:this.taskStartDate,
      taskWeight:this.taskWeight,
      extraDetails:this.extraDetails,
      members:this.members,
      status:"processing"
    }



   this.tasksArray.push(taskarrayobject);
    console.log(this.tasksArray);
    this.changebtnstatustodisplaytasksform();
   this.members=[];

  }
  fieldvalidetor1(){
    if(this.taskTitle==null || this.taskDueDate==null || this.taskStartDate==null || this.taskWeight==null ){
      return true;
      }
      }


  fieldvalidetor2(){
    if(this.projectTitle==null || this.dueDate==null || this.startDate==null){
      return true;
      }
      }
      changebtnstatustodisplaytasksform(){
    this.btnstatus="tasks";
    }
    changebtnstatustodisplaymembersintheproject(){
      if(this.taskDueDate<this.taskStartDate){
        this.flashMessages.show('Project Due Date Can Not Be Before The Start Date!', {cssClass: 'alert-danger', timeout: 1500});
      }else {
        this.btnstatus = "taskmembers"
      }    }
    checkbtntochangeformtomemberstotask(){
    if(this.btnstatus=="taskmembers"){
      return true;
    }
    }

addMembersToTaskArray(email){
  this.members.push(email);
  //console.log(this.email);
  }
  validateAddMembersToTasks(email){
    for(var i=0;i<this.members.length;i++){
      if(this.members[i]==email){
        return true;
      }
    }
  }
validateConfirmAddingTasks(){
    for(var i=0;i<this.tasksArray.length;i++){
      if(this.tasksArray[i]!=null){
        return true;
        }
    }
}

addTasksToProject(){

  if(this.taskDueDate<this.taskStartDate){
    this.flashMessages.show('Project Due Date Can Not Be Before The Start Date!', {cssClass: 'alert-danger', timeout: 1500});
  }

  else {

    const projectTask = {

      projectTitle: this.currentCreatedProject.projectTitle,
      tasks: this.tasksArray
    }

//  console.log(projectTask);
    this.authService.addProjectTasks(projectTask).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.flashMessages.show('Tasks Successfully Added!', {cssClass: 'alert-success', timeout: 1500});
      console.log(res);


    });


  }

}


  checkbtntochangeformtodisplaymembersaddedtoproject(){
    if(this.btnstatus=="membersaddedtoatask"){
      return true;
    }
  }


  displayMembersInParticularTask(members){



      this.membershelpertodisplay = members;
      this.btnstatus = "membersaddedtoatask";


  }



}


