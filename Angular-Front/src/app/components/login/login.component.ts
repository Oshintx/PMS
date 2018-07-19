import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';//need to import this FlashMessagesService class to display a FlashMessagesService inside login
import{Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:String;//data that are fill with text boxes will map with these variables
  password:String;


  constructor(private authservice:AuthService,private flashMessages:FlashMessagesService,private router:Router) { }


  ngOnInit() {
  }


  loginUser(){

      const user={

        email:this.email,
        password:this.password

      };

      this.authservice.loginUser(user).subscribe(res=>{

        if(res.state) {
          this.authservice.storeData(res.token);//data that are send with respond,these data pass to the method storedata to store these data in local storage(browser local storage)
          this.flashMessages.show('You are succesfully loggedin!', {cssClass: 'alert-success', timeout: 600});
          this.router.navigate(['/dashboard']);
          }
        else{
          this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/login']);

        }



      });




  }

}
