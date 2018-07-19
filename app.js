const express =require('express');//import(load) the express module-We installed this and it goes to package.json and now it is in node_modules
const app=express();//initialize express-now can access express modulesthrough app variable.
const morgan=require('morgan');//HTTP request logger middleware for node.js
app.use(morgan('dev'));//Concise output colored by response status for development use. The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//ex:POST /users/login 200 646.972 ms - 495=method :url :status :response-time ms - :res[content-length]

const cors=require('cors');
app.use(cors());

const bodyParser=require('body-parser');//initialize port to the server
const port=process.env.PORT ||8000;//tells the server use 8080 port or if the env to which you are deploying to has a specific server that requires use that instesd


//following two codes tell to server(node app) read post request body as a json.                        //TODO 1-coudnt include project id in projectTask model-not done yet search by title
                                                                                                        //TODO 2-add Project Start Date To project Model-done
                                                                                                        //TODO 3-If can change membermodel to contain only project details as projectid
                                                                                                        //TODO 4-add attributes and validations to models
                                                                                                        //TODO 5-always get project manger and current user email-done
                                                                                                        //TODO 6-apply authgurd
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//create a express server
app.listen(port,function(){ //listen to the port no 3000 and if  listen give call back (print as listning to port 3000).

    console.log("listning to port"+ port);
});



//root url pattern-localhost:3000
//app.get("/",function(req,res){      //if url pattern is localhost:3000 give a call back(execute function) by getting the req.

  //  res.send("welcome to the dashboard");//here its going to call a function upon request we are going to respond with sending welcome to the dash board to the browser
//});

// /const port=process.env.PORT||3000;//initialize port
//const path=require('path');//import(load) the path module(package)-by default this is in node_modules


const mongoose=require('mongoose');//import(load) mongoose module -We installed this and it goes to package.json and now it in node_modules-to use mongo db we uses mongoose via this we connect created models(design database schema)
const config=require('./config/database');//import(load) config module(a package we created in this project)-We created this package(cofig) inside project now can access the things(database connection using database variable-authapp) inside this package-here config become the object that is in database.js and can access that object propertie database through config now.

const connection=mongoose.connect(config.database);//connect mongoose to authapp db by calling the variable database using object cofig
if(connection){
    console.log("database connected");
}
else{
    console.log("database does not connected");
}

const projectTasks=require('./controller/routes/projectTasks');
const users=require('./controller/routes/users');//import(load) routes module(a package we created in this project)-We created this package(routes) inside project now can access the things(routes related to users using routes variable) inside this package.
const projects=require('./controller/routes/projects');


//users url pattern-localhost:3000/users
app.use("/users",users); //if the url pattern is localhost:3000/user or localhost:3000/user/register or what ever affter localhost:3000/user it first looks for users.js(as this tells look for users variable and in users variable can find path to the users file ) and find /register or what ever if there  affter the /users pattern if this is only looks for users then find ony /users or empty string url pattern there
app.use("/projects",projects);
app.use("/projectTasks",projectTasks);

//app.use(express.static(path.join(__dirname,"public")));//here  tells to the server that join the cuurent directry(__dirname) and public folder -this give tha path to the static files,  from this identify front end is inside public folder

const passport=require('passport');//import(load) passport module -We installed this and it goes to package.json and now it in node_modules-To make token base system we are doing authenticate via passport middle ware .passport is a very goog middle wear for authentications
app.use(passport.initialize());
app.use(passport.session());


/**
 * here require the passport function inside passport.js which is inside config
 */
require('./config/passport')(passport);

