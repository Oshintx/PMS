import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import{Tasks} from '../mytasks/tasks'
@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {

  us:any;
  tasks:Tasks[]=[];
  status:String;

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

      this.authservice.getmytasks(email).subscribe(res=>{
        this.tasks=res;

     //   console.log( this.tasks);

      });






    });





  }









}
