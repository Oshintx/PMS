import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import{Projmember} from '../ongoinprojects/projectmember'
import{Member} from '../ongoinprojects/member'
import{Task} from '../ongoinprojects/task'
@Component({
  selector: 'app-ongoinprojects',
  templateUrl: './ongoinprojects.component.html',
  styleUrls: ['./ongoinprojects.component.css']
})
export class OngoinprojectsComponent implements OnInit {

  us:any;
  ongoinprojects:Projmember[]=[];
  btnstatus:String;
  memberstoproj:Member[]=[];
  tasksarray:Task[]=[]
  taskmemberarray:String[]=[];
  constructor(private authservice:AuthService) { }

  ngOnInit() {

    this.getCurentUser();
  }




  getCurentUser(){

    this.authservice.getProfile().subscribe(res=>{
      this.us=res.user;

      const email={
        email:this.us.email
      }

      this.authservice.getOnGoinProjects(email).subscribe(res=>{
        this.ongoinprojects=res;
      });






    });





  }







  changebtnStatusToDisplaymembersinongoinprojects(){

    this.btnstatus="ongomemb"


  }
  checkbtnstatustodisplayongoinprojmembers(){

    if(this.btnstatus=="ongomemb"){

      return true;

    }


  }

  members(projectID){

    this.authservice.serachtaskstoproject(projectID).subscribe(users=>{

      //   this.usertotask=users.members;
      //console.log(users.members[0]);
      this.memberstoproj=users.members;
     this.changebtnStatusToDisplaymembersinongoinprojects();

      //  console.log(this.memberstoproj[0]);





    });

  }

  tasks(projectTitle){

    this.authservice.tasks(projectTitle).subscribe(tasks=>{

     this.tasksarray=tasks.tasks;

     this.btnstatus="tasks"


    });

  }


  checkbtnstatustodisplaytasks(){
    if(this.btnstatus=="tasks"){
      return true;


    }


  }


  changestatustofalse(){

    this.btnstatus="false";

  }



  changestatustodisplaytaskmembers(members){
    this.taskmemberarray=members;
    this.changestatustodisplaymembersintask();
  //  this.status="tasksmembers";
  }


  changestatustodisplaymembersintask(){

    this.btnstatus="mmbertask";

  }

  checkbtnstatustodisplaytaskmember(){

    if(this.btnstatus=="mmbertask")
    {
      return true;
    }
  }

}
