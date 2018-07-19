var chakram = require("chakram"),
    expect = chakram.expect;

describe("RestFul Endpoint testing by Chakram test", () => {



    it("User Must register",function(){

        let user={
            username:"User Created By Mocha",
            name: "Mocha User",
            email: "mocha@gmail.com",
            projectCount:0,
            role: "user",
            password: "123"
        };
        var response=chakram.post("http://localhost:8000/users/register",user);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("User Must Login",function(){

        let user={
            email:"mocha@gmail.com",
            password:"123"
        };
        var response=chakram.post("http://localhost:8000/users/login",user);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Must create a project",function(){

        let project={

            projectTitle: "mochaPostTestProjectTitle",
            dueDate: "2018.10.09",
            startDate:"2018.09.01",
            note:"mochaPostTestPassed",
            projectmanger:"mocha"

        };
        var response=chakram.post("http://localhost:8000/projects/myproject",project);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should return all projects",function(){
        var response=chakram.get("http://localhost:8000/projects/allprojects");
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should update project details",function () {
        let project={

            note: "mochaUpdateProjectTestPassed",
            dueDate: "2018.10.10",
            startDate:"2018.09.02",
        };
        var response=chakram.put("http://localhost:8000/projects/updateprojectdetails/",project);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("User Should be able to Deactivate",function(){
        var response=chakram.delete("http://localhost:8000/users/myprofile/");
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("User Must view the circle",function(){

        let user={
            id:"5b24ac4d1a6bef2be84ab100"
        };
        var response=chakram.post("http://localhost:8000/users/mycircle",user);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("User Can send requests",function(){

        let user={
            requests:[{"fromName":"oshin",
                fromEmail:"oshin@gmail.com",
                tonName:"test",
                toEmail:"test@gmail.com",
                status:"false"},{"fromName":"oshin",
                fromEmail:"oshin@gmail.com",
                tonName:"test2",
                toEmail:"test2@gmail.com",
                status:"false"}],
            id:["",""],
            sentrequests:[{
                tonName:"test",
                toEmail:"test@gmail.com",
                status:"false"},{

                tonName:"test2",
                toEmail:"test2@gmail.com",
                status:"false"}
            ],
            sentid:""
        };
        var response=chakram.post("http://localhost:8000/users/memberrequest",user);
        expect(response).to.have.status(200);
        return chakram.wait();
    });
});