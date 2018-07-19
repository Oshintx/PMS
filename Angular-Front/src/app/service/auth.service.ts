import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../components/displayusers/user';
import {Projmember} from '../components/dashboard/projmember';
import {Request} from '../components/display-requests/request';
import {tokenNotExpired} from 'angular2-jwt';//need to nstall this to handle if token os expired what should be display and if not what should display(what are the tabs that should display in navigation)
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class AuthService {

  user:any;//user is an object there for define type of that as any typ
  project:any;
  authtoken:any;

  private currentUser=new BehaviorSubject<any>('lllll');
  currentUs=this.currentUser.asObservable();


  constructor(private http:Http) {
  }


  // createdProjcount:any;

    changeCurrentUser(currentUs){

      this.currentUser.next(currentUs);



  }

  //this methode is to take data and send to localhost:3000/users/register url(to request body)
  registerUser(user){

    //console.log(user);//-from this out put could identify that data is comming to this place
    //now need to send these data to server through url header and body.

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/register',user,{headers:headers}).map(res=>res.json());//here comes respond from backend and it will return
  }

  addProject(project){

    //console.log(project);

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/myproject',project,{headers:headers}).map(res=>res.json());


  }

  addProjectMembers(memberProject){

    //console.log(project);

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/createprojectmembers',memberProject,{headers:headers}).map(res=>res.json());


  }
  addProjectTasks(projectTask){

    //console.log(project);

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/createprojecttasks',projectTask,{headers:headers}).map(res=>res.json());


  }







  loginUser(user){//sending http request to the back end

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/login',user,{headers:headers}).map(res=>res.json());



  }


  getProfile(){
//in order to call  profile url need to have a authentication header
    this.fetchToken();
    let headers=new Headers();

    headers.append('Authorization',this.authtoken);//need to be the  header as a autherization header and need to load the token which is in local storage,as fetch method call here we can use this.authtoken inside here
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8000/users/profile',{headers:headers}).map(res=>res.json());//here returning respond affter send the respond


  }




/*
  getCurrentDateService(){

    return this.http.get("http://localhost:8000/projects/getcurrentdate").map(res=>res.json());


  }*/



/*
  setCreatedProjectCount(createdprojcount){

     this.createdProjcount=createdprojcount;



  }

  getCreatedProjectCount(){


      return this.createdProjcount;
  }
*/


  fetchToken(){//load the token in local storage

    const token=localStorage.getItem("tokenid");
    this.authtoken=token;
    //console.log(this.authtoken);


  }

  logout(){//here need to remove all the data inside local storage and need to redirect to home page-here this will not send any data to the backend and not taking any data from back end every thing is happen inside front end
    this.authtoken=null;
   // this.user=null;
    localStorage.clear();//clear the local storage


  }
  //loggedIn means affeter log in

  loggedIn(){//this function will check whether the  there is a token or not(whether expired) to use this function we import  tokenNotExpired class.because other wise even though there is a user without a token and if type profile url  can go to that but as we used passport authentication will not direct any data to user(give unauthorization error but can see profile page) but still can access that url .so here can go to profile  whether the user is unauthorize or authorize.but this should not be happen can not display the profile page if access the profile url by typing it.in there it should make as  directs to login page if type url profile.this function will handle this

  return tokenNotExpired("tokenid");//definitly should pass tokenid

  }






  //inside this method need to store data that send with respond(tag,user data)

  storeData(token){
//Inside local storage only can store strings cant store objects
    localStorage.setItem("tokenid",token);//here token is an Id and it is a string.
   // localStorage.setItem("user",JSON.stringify(userData));//userData is an object there for need to convert it in to a json object(a string type object)
    this.authtoken=token;//assign valus to above declared variables
  //  this.user=userData;



  }


  getUsers(){

    return this.http.get("http://localhost:8000/users/allusers").map(res=>res.json());
    }


  getprojectcount(){

    return this.http.get("http://localhost:8000/projects/getprojectcount").map(res=>res.json());
  }



  getCreatedProjectsService(projectmanager){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/getiamcreatedprojects',projectmanager,{headers:headers}).map((res:Response)=>res.json());

  }


  getAllProjects(email):Observable<Projmember[]>{
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/getmeberprojectremainingdays',email,{headers:headers}).map((res:Response)=><Projmember[]>res.json());

  }

  getOnGoinProjects(name):Observable<Projmember[]>{
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/getongoinmemberprojects',name,{headers:headers}).map((res:Response)=><Projmember[]>res.json());

  }


  getmytasks(email){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/membertask',email,{headers:headers}).map((res:Response)=>res.json());

  }




  serachuserstoproject(currentuid){
   // return this.http.get("http://localhost:8000/projects/mycircle").map((res:Response)=><User[]>res.json());

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/mycircle',currentuid,{headers:headers}).map((res:Response)=>res.json());

    }
  serachtasks(){
    return this.http.get("http://localhost:8000/projects/getnewlycreatedprojecttoaddtasks").map((res:Response)=>res.json());

  }

    deleteUser(id)
    {
      return this.http.delete("http://localhost:8000/users/myprofile/"+id).map(res=>res.json());
    }

    addUsersToProjectArray(id){

      return this.http.get("http://localhost:8000/users/showuser/"+id).map(res=>res.json());

    }


  serachtaskstoproject(projectid){
    return this.http.get("http://localhost:8000/projects/getmemberstoproject/"+projectid).map((res:Response)=>res.json());

  }


  tasks(projectTitle){
    return this.http.get("http://localhost:8000/projects/getalltasksaccordingtoprojecttitle/"+projectTitle).map((res:Response)=>res.json());

  }

  addrandomMembersToProject(memberProject){


    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/projects/getprojectbyprojectnumberandaddmembers',memberProject,{headers:headers}).map(res=>res.json());


  }



  updateprojectcount(id,projcou){
    //console.log(projectCount);
  return this.http.put("http://localhost:8000/users/updateprojectcount/"+id,projcou).map(res=>res.json());

  }


  updateDates(id,projdates){
    //console.log(projectCount);
    return this.http.put("http://localhost:8000/projects/updateprojectdetails/"+id,projdates).map(res=>res.json());

  }


  updateprofile(id,profiledetails){
    //console.log(projectCount);
    return this.http.put("http://localhost:8000/users/updateprofile/"+id,profiledetails).map(res=>res.json());

  }




  sendRequests(usersequsets){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/memberrequest',usersequsets,{headers:headers}).map(res=>res.json());


  }

  getRequests(id){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/getRequests',id,{headers:headers}).map(res=>res.json());


  }


  getRequConfirmNoticeServiced(id){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/notices',id,{headers:headers}).map(res=>res.json());


  }


  confirmRequestservice(email){

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/confirmrequest',email,{headers:headers}).map(res=>res.json());



  }

/*
  acceptrequestservice(currentUserId){

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/acceptrquest',currentUserId,{headers:headers}).map(res=>res.json());



  }*/






}
