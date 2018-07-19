import { Component, OnInit } from '@angular/core';//this will not register in class constructor
import{AuthService} from '../../service/auth.service';//need to call a Auth service with following user data there for we need Authservice class there for n need to load that relevent file
import { FlashMessagesService } from 'angular2-flash-messages';//need to import this FlashMessagesService class to display a FlashMessagesService inside register
import{Router} from '@angular/router';
//AuthService and FlashMessageService ,Router are classes ;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:String;
  name:String;//need to assign data types of data that are coming from front end
  email:String;

  role:String="User";
  projectCount:Number=0;
  password:String;


  constructor(private authService:AuthService,private flashMessages:FlashMessagesService,private router:Router) {  }//what ever class use inside class(what ever class imported) need to register in constructor

  ngOnInit() {
  }
  registerData(){

    const user={
      username:this.username,//here this.userName take the value from binded data in (ngModel)="userName" and store in a property.
      name:this.name,
      email:this.email,
      projectCount:this.projectCount,
      role:this.role,
      password:this.password
    };
     //now user object contain all the data that are pass from front end now we need services to send these data to backend
      //console.log(user);
    this.authService.registerUser(user).subscribe(res=>{//here takes the respond that is returnong there for now can subscribe

      if(res.state) {
        this.authService.storeData(res.token);
        this.flashMessages.show('You are registered!', {cssClass: 'alert-success', timeout: 600});//message-You are registered!,alert-alert-success,timeTakenToDisplay-3000msec-3sec

        this.router.navigate(['/dashboard']);
      }
      else {
        this.flashMessages.show('Somrthing Went Wrong!', {cssClass: 'alert-dangers', timeout: 800});//message-You are registered!,alert-alert-success,timeTakenToDisplay-1000msec-3sec
        this.router.navigate(['/register']);

      }

    });


  }

}
