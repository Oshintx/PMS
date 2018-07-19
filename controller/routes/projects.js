const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const MemberProject = require('../../models/memberProject');
const User = require('../../models/user');
const Projecttask = require('../../models/projectTask');


var newproject;
var newMemberProject;

router.get("", (req, res) => {
    res.send("Hello You can manage projects here");
});


router.post("/myproject", (req, res) => {
    const newProject = new Project(
        {
            projectID: req.body.projectID,
            projectTitle: req.body.projectTitle,
            dueDate: req.body.dueDate,
            startDate: req.body.startDate,
            projectmanger: req.body.projectmanger,
            note: req.body.note                              //TODO 4 project manger need to store with email
        });
    newproject = saveProject(newProject, function (err, project) {
        if (err) {
            // console.error(err);//this will print the error
            res.json({state: false, msg: 'data not inserted'});
        }
        if (project) {
            res.json(project);
        }
    });
});


router.post("/createprojectmembers", (req, res) => {
    // console.log(req.body);
    //console.log(req.body.members);
    newMemberProject = new MemberProject(
        {
            projectID: req.body.projectID,
            projectTitle: req.body.projectTitle,
            dueDate: req.body.dueDate,
            startDate: req.body.startDate,
            note: req.body.note,
            projectmanger: req.body.projectmanger,
            members: req.body.members

        });
    // console.log(newMemberProject);
    saveMemberProject(newMemberProject, function (err, project) {

        if (err) //if came an error it will throw
        {
            // console.error(err);//this will print the error
            res.json({state: false, msg: 'data not inserted'});
        }
        if (project) {
            res.json({state: true, msg: 'data inserted'});

        }

    });
});


router.get("/getmemberstoproject/:projectid", (req, res) => {

    MemberProject.findOne({projectID: req.params.projectid}, 'members ', (err, projectmembers) => {
        if (err) {
            res.json({errmsg: err});
        }
        else {
            //TODO change i-done
            res.json(projectmembers);
        }

    });
});


router.post("/createprojecttasks", (req, res) => {

    const newProjectTask = new Projecttask(
        {

            projectTitle: req.body.projectTitle,
            tasks: req.body.tasks

            //TODO change 1-task case-not complete yrt due to unable to store project id in project task
        });

//console.log(newProjectTask);
    saveProjectTask(newProjectTask, function (err, createdprojecttask) {

        if (err) //if came an error it will throw
        {
            // console.log(err);
            res.json(err);
        }
        if (createdprojecttask) {
            res.json(createdprojecttask)
            //res.json({state:true,msg:'task inserted to the project'});
        }

    });
});


router.post("/addintermediateprojecttasks", (req, res) => {

    getProjectTaskById(req.body.id, function (err, projecttask) {
        if (err) {
            console.log("an error of getting the project" + err);
        }
        else {
            projecttask.tasks.push(req.body.tasks);
            // res.json(projecttask.tasks);
            //TODO make front end of this

            saveProjectTask(projecttask, function (err, savedprojecttask) {
                if (err) {
                    res.json(err);
                }
                if (savedprojecttask) {
                    res.json(savedprojecttask)
                }
            });
        }
    });
});


router.post("/updatetaskstatus", function (req, res) {


    getProjectTaskById(req.body.id, function (err, projecttask) {
        if (err) {
            console.log("an error of getting the project" + err);
        }
        else {
            for (var i = 0; i < projecttask.tasks.length; i++) {
                if (projecttask.tasks[i].taskTitle == req.body.taskTitle) {
                    projecttask.tasks[i].status = "Done";
                }
            }
            saveProjectTask(projecttask, function (err, savedstatusupdatedprojecttask) {

                if (err) {

                    res.json(err);
                }
                if (savedstatusupdatedprojecttask) {
                    res.json(savedstatusupdatedprojecttask)
                }
            });
        }
    });
});


/**
 * @param params._id
 * @param req.body.projectmanager
 * @return createdbymeproj
 */

router.post("/getiamcreatedprojects", (req, res) => {

    var createdbymeproj = [];
    var i = 0;
    Project.find({}, (err, projects) => {
        if (err) {
            res.json({errmsg: err});
        }
        else {
            for (i; i < projects.length; i++) {
                if (projects[i].projectmanger == req.body.projectmanager) {
                    createdbymeproj.push(projects[i]);
                }
            }
            res.json(createdbymeproj);
        }

    });
});

router.get('/project/:_id', (req, res) => {
    getProjectById(req.params._id, function (err, project) {
        if (err) {
            console.log("an error of getting the project" + err);
        }
        else {
            res.json(project);
        }
    });
});

router.post("/getmeberprojectremainingdays", (req, res) => {
    var array = [];
    var dueDate;

    var i = 0;
    var j;
    var remainingdays;

    MemberProject.find({}, (err, memeberprojects) => {
        if (err) {
            res.json({errmsg: err});
        }
        else {
            for (i; i < memeberprojects.length; i++) {
                for (j = 0; j < memeberprojects[i].members.length; j++) {
                    if (memeberprojects[i].members[j].email == req.body.email) {
                        var today = new Date();
                        dueDate = memeberprojects[i].dueDate;
                        // startdate=memeberprojects[i].startDate;
                        remainingdays = Math.floor((Date.parse(dueDate) - Date.parse(today)) / 86400000);
                        memeberprojects[i].remainingdays = remainingdays;
                        array.push(memeberprojects[i]);
                    }
                }
            }
            res.json(array);
        }
    });

});


router.post("/getongoinmemberprojects", (req, res) => {
    var ongoinmemberprojarray = [];


    var i = 0;
    var j;
    var startdate;
    MemberProject.find({}, (err, memeberprojects) => {
        if (err) {
            res.json({errmsg: err});
        }
        else {
            for (i; i < memeberprojects.length; i++) {
                for (j = 0; j < memeberprojects[i].members.length; j++) {
                    if (memeberprojects[i].members[j].email == req.body.email) {
                        var today = new Date();
                        //TODO -a inuse url
                        var today = new Date();
                        var dd = today.getDate();               //TODO -a inuse url
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();
                        today = mm + '/' + dd + '/' + yyyy;


                        var ddd = memeberprojects[i].startDate.getDate();
                        var mmm = memeberprojects[i].startDate.getMonth();
                        var yyyy = memeberprojects[i].startDate.getFullYear();

                        if (ddd < dd || ddd==dd) {

                            ongoinmemberprojarray.push(memeberprojects[i]);//TODO check here
                        }
                    }
                }
            }
            res.json(ongoinmemberprojarray);
        }
    });
});


router.get("/getalltasksaccordingtoprojecttitle/:projectTitle", (req, res) => {
    Projecttask.findOne({projectTitle: req.params.projectTitle}, 'tasks ', (err, tasksAccordingToProjectId) => {//TODO change 3-task case
        if (err) {
            res.json({state: false, msg: 'task does not inserted to the project'});
        }
        else {
            //  console.log(tasksAccordingToProjectId);
            res.json(tasksAccordingToProjectId);
        }
    });
});


router.get('/getprojectcount', (req, res) => {
    getProjectCount(function (err, noofprojects) {
        if (err) {
            console.log("data retrive error" + err);
        }
        else {
            res.json(noofprojects);
            //  console.log(projects);
        }
    })
});


router.post('/getprojectbyprojectnumberandaddmembers', (req, res) => {
    var i = 0;
    getProjectByProjectNo(req.body.projectID, function (err, project) {
        if (err) {
            console.log("data retrive error" + err);
        }
        else {

            for (i; i < req.body.memberarray.length; i++) {

                //  console.log(req.body.memberarray[i]);
                project.members.push(req.body.memberarray[i]);
                // res.json( project.members);
            }

            saveMemberProject(project, function (err, membersaddedproject) {

                if (err) {
                    console.error(err);//this will print the error
                    res.json({state: false, msg: 'members to project not inserted'});
                }
                else {
                    res.json(membersaddedproject);

                }

            });


        }


    });

});


router.get('/allprojects', (req, res) => {
    getAllProjects(function (err, projects) {

        if (err) {
            console.log("data retrive error" + err);
        }
        else {
            res.json(projects);
        }
    })
});

router.post('/membertask', (req, res) => {
    getAllProjectTask(function (err, projecttask) {
        var array = [];
        var arraymemberselected = [];
        var finalarray = [];
        if (err) {
            console.log("data retrive error" + err);
        }
        else {
            for (var i = 0; i < projecttask.length; i++) {
                for (var j = 0; j < projecttask[i].tasks.length; j++) {
                    array.push(projecttask[i].tasks[j]);
                    // console.log(array);
                }
            }
            for (var y = 0; y < array.length; y++) {

                for (var z = 0; z < array[y].members.length; z++) {

                    if (array[y].members[z] == req.body.email)

                        arraymemberselected.push(array[y]);
                }

            }

            res.json(arraymemberselected);
        }
        //TODO complete find tasks to display
    })

});


router.post('/getprojecstbytaskid', (req, res) => {
    getAllProjectTask(function (err, projecttask) {
        var projecttsasks;
        if (err) {
            console.log("data retrive error" + err);
        }
        else {
            //  console.log(projecttask);
            for (var i = 0; i < projecttask.length; i++) {
                for (var j = 0; j < projecttask[i].tasks.length; j++) {
                    if (projecttask[i].tasks[j]._id == req.body.id) {
                        projecttsasks = projecttask[i];
                        //  console.log(projecttask[i]);
                    }
                }
            }
            res.json(projecttsasks);
        }
    })

});


router.put("/updateprojectdetails/:_id", function (req, res) {
    const update = {
       note:req.body.note,
        dueDate:req.body.dueDate,
        startDate:req.body.startDate
    };
    updateProject(req.params._id, update, function (err, updatedtask) {
        if (err) {
            console.log("an error of updating the user" + err);
            res.json({errmsg: err});
        }
        else {
            res.json(updatedtask);
        }
    });
});



/**
 * @param newProject
 * @param callback
 * @return {*}
 */
saveProject = function (newProject, callback) {
    newProject.save(callback);//save the new user to database and give a call back(which is come as a parameter to saveUser function) to the user.call back is the respond that gives when submited data.
    return newProject;
};

/**
 * @param newMemberProject
 * @param callback
 */
saveMemberProject = function (newMemberProject, callback) {
    newMemberProject.save(callback);//save the new user to database and give a call back(which is come as a parameter to saveUser function) to the user.call back is the respond that gives when submited data.
};

/**
 * @param newProjectTask
 * @param callback
 */
saveProjectTask = function (newProjectTask, callback) {
    newProjectTask.save(callback);//save the new user to database and give a call back(which is come as a parameter to saveUser function) to the user.call back is the respond that gives when submited data.
};

/**
 * @param id
 * @param callback
 */
getProjectById = function (id, callback) {
    Project.findById(id, callback);
};

/**
 * @param id
 * @param callback
 */
getProjectTaskById = function (id, callback) {
    Projecttask.findById(id, callback);
};

/**
 * @param callback
 */
getAllProjects = function (callback) {
    //console.log("oshin.....");
    Project.find(callback);

};

/**
 * @param callback
 */
getProjectCount = function (callback) {
    Project.count(callback);
};

/**
 * @param projectID
 * @param callback
 */
getProjectByProjectNo = function (projectID, callback) {
    const query = {projectID: projectID};
    MemberProject.findOne(query, callback);
};

/**
 * @param callback
 */
getAllProjectTask = function (callback) {

    Projecttask.find(callback);
};
/**
 * @param id
 * @param update
 * @param callback
 */
updateProject = function (id, update, callback) {

    Project.findByIdAndUpdate(id, {$set: update}, callback);

};


module.exports = router;