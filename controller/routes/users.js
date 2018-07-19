//here have all the routes related to user
const bcrypt = require('bcryptjs');//import(load) the bcrypt module-We installed this and it goes to package.json and now it is in node_modules-this is reqired to encrypt the password


const express = require('express');
const router = express.Router();//load(assign) express router(cz all the routers handle through express router)
// here instesd of app gives the router cz all the requests handle through express router

//If reaquest a page/nonsensitive data  requesting method is GET method
//this is the main url of users -pattern-localhost:3000/users
//As this is the main url of users without giving the url pattern(by giving a empty string) can access this .which means in app.js it gives url as app.use('/user,user') .there for it access the user urls and find /user or empty url(empty string) which both give same meaning and finaly this gives a call back as hello user
router.get("", function (req, res) {
    res.send("Hello user");
});

//pattern-localhost:3000/users/register
//router.get("/register",function(req,res){
//  res.send("Please register to proceede");
//});

const User = require('../../models/user');
const jwt = require('jsonwebtoken');//import(load) jsonwebtoken module -We installed this and it goes to package.json and now it in node_modules-from this can create a web token
const config = require('../../config/database');//here import database file to use secret key
const passport = require('passport');

//withing the button click if submit a form/sensitive data requesting method is POST
//this is one of url of users -pattern-localhost:3000/users
//As this is not a main url of this users need to define the pattern as /register.
router.post("/register", function (req, res) {
    // console.log(req.body);
    // console.log(req.body.userName);     //here tells if request comes succesfully print post data.(data that fill in postman body/data that in request body)
    const newUser = new User(
        {
            username: req.body.username,//here userName is the field in userSchema and to that take request body key  call username that key has value oshin .
            name: req.body.name,
            email: req.body.email,
            projectCount: req.body.projectCount,
            role: req.body.role,
            //requests:req.body.requests,
            password: req.body.password

        });
    // console.log(newUser);
    saveUser(newUser, function (err, user) {//pass the created object as parameter and need a call back that will also pass as a function
        //call back can be an error or successfully inserted user document.
        //since we are using postman call back will display in postman.
        //here gives responds as  jsons


        if (err) //if came an error it will throw
        {
            // console.error(err);//this will print the error
            res.json({state: false, msg: 'data not inserted'});


        }
        if (user) {

            const token = jwt.sign({user: user}, config.secret, {expiresIn: 86400});
            res.json(//as respond give state and a token and logged users details
                {
                    state: true,
                    token: "Bearer " + token,//Definitly should give a token  with Bearer prefix according to JWT new version
                    /* user: {
                         id: user._id,
                         name: user.name,
                         userName: user.userName,
                         email: user.email


                     }*/

                }
            )


            //res.json({state: true, msg: 'data inserted'});

        }//if the doc inserted correctly need to give a respond as inserted data correctly

    })
});

saveUser = function (newUser, callback) {
    //console.log(newUser);
    //need to encrypt the password for that use a new package or a new module call bcryptjs
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {//here newUser.password is the one which is need to encrypt.
            // console.log(hash);//from this function return the hash(encrypted password)
            newUser.password = hash;//store the encrypted password in newUser.password
            // if(err)throw err ;  //if came an error it will throw(crashes the server)
            if (err) {
                console.log("something wrong" + err);
            }
            else {

                newUser.save(callback);//save the new user to database and give a call back(which is come as a parameter to saveUser function) to the user.call back is the respond that gives when submited data.
            }
        });

    });
};


router.post("/login", function (req, res) {
    //console.log(req.body);//here tells if request comes succesfully print post data.(data that fill in postman body/data that in request body)


    const email = req.body.email;
    const password = req.body.password;

    findByEmail(email, function (err, user) {//here user is the one who is responsible for the mail
        //here gives responds as  jsons
        //  if(err)throw err;
        if (err) {
            console.log("An error" + err);
        }
        if (!user) {
            res.json({state: false, msg: 'No user found'})
            // insted of writin following password checking part inside if(user) we can add a return statement here as return false;
        }

        if (user) {//password checking should goes under this condition other wise this will prompt an error like (err)throw err

            passwordCheck(password, user.password, function (err, match) {//here also checks both passwords and call the passing method inside passwordCheck  by giving the arguments err and match
                if (match) {
                    //if email and password maches create a token for expire withing a day
                    const token = jwt.sign({user: user}, config.secret, {expiresIn: 86400});//first parameter is user data and second parameter is secret key,third parameter is time taken to expire the token in second-for a one day have 86400,also here need to pass a plain object Which I assume is mongoosejs object, which contains many methods and is not "serializable". You could handle this by passing a plain object, by either using .lean() from mongoose or plain toJSON method.there for here uses toJson method
                    res.json(//as respond give state and a token and logged users details
                        {
                            state: true,
                            token: "Bearer " + token,//Definitly should give a token  with Bearer prefix according to JWT new version
                            user: {
                                id: user._id,

                            }

                        }
                    )
                }
                else {

                    res.json({state: false, msg: 'Password Does Not Match'});

                }


            });
        }


    });
});


findByEmail = function (email1, callback) {
    const query = {email: email1};//check whether email that is passing is equals to the email in database
    User.findOne(query, callback);
};


passwordCheck = function (plainPassword, hash, callback) {//here pass plain password as password that user type and hash password is the password that in the db to the relevent email
    bcrypt.compare(plainPassword, hash, function (err, res) {//here checks plain password and hash and will give result as true or false as whether err is true or false /whether res is true or false
//    if(err) throw err;
        if (err) {
            console.log("an error" + err);
        }
        if (res) {
            callback(null, res);//here calling the function callback by providing the appropriate parameters
        }
        else {
            callback(null, res);//need call this even if res is false.
        }

    });
};


//Here if directs to a url with profile need to directs it by authenticate through the token.it gose as follow
router.get('/profile', passport.authenticate('jwt', {session: false}), function (req, res) {//this is a get method as theres no any sensetive data when requesting the profile

        res.json({user: req.user});//here respond is json type means it is as object type. and here give respond as user data in request
        //   console.log(req.user);

    }
);

//update an user

router.put("/updateprojectcount/:_id", function (req, res) {

    const update = {

        projectCount: req.body.projectCount,


    };
    //   console.log(req.body.projectCount);

    updateUser(req.params._id, update, function (err, updatedUser) {

        if (err) {

            console.log("an error of updating the user" + err);
            res.json({errmsg: err});
        }
        else {

            getUser(req.body.id, function (err, getuser) {

                if (err) {

                    console.log("an error of geting the user" + err);
                    res.json({errmsg: err});
                }
                else {

                    var i = 0;

                    for (i; i < getuser.membersincircle.length; i++) {

                        if (getuser.membersincircle[i].name == req.body.name) {

                            getuser.membersincircle[i].projectCount = req.body.projectCount;

                            saveUserWithUpdatedProCount(getuser, function (err, updatedprojcountuser) {

                                if (err) {

                                    console.log("an error of geting the user" + err);
                                    res.json({errmsg: err});
                                }
                                else {
                                    console.log(updatedprojcountuser);
                                }


                            });


                            //  console.log(getuser); //TODO last point


                        }


                    }


                }


            });


        }

    });

});


updateUser = function (id, update, callback) {

    User.findByIdAndUpdate(id, {$set: update}, callback);

};


router.post("/memberrequest", function (req, res) {
    var i = 0;
    var y = 0;
    var z = 0;
    // console.log(req.body);
    //  res.json(req.body.id);
    for (i; i < req.body.id.length; i++) {
        //   res.json(req.body.id[i]);
        //   console.log(req.body.requests[i]);
        getUser(req.body.id[i], function (err, requestUser) {
            if (err) {
                // console.log("an error of updating the user" + err);
                //  res.json({errmsg: err});
            }
            else {
                //   console.log("i-"+i);
                y++;
                //console.log("y=" + y);
                requestUser.requests.push(req.body.requests[y - 1]);
//                console.log(req.body.requests[y-1]);
                //   console.log(requestUser.requests);
                saveUserReq(requestUser, function (err, requesedtUser) {
                    if (err) {
                        // console.log("an error of updating the user" + err);
                        //       res.json({errmsg: err});
                    }
                    else {
                        getUser(req.body.sentid, function (err, requestSentUser) {
                            if (err) {
                                console.log("an error of updating the user" + err);
                                // res.json({errmsg: err});
                            }
                            else {
                                z++;
                                //  console.log("z-"+z);
                                requestSentUser.sentrequests.push(req.body.sentrequests[z - 1]);
                                //console.log(requestSentUser.sentrequests);
                                saveUserReq(requestSentUser, function (err, requestoversentUser) {
                                    if (err) {
                                        // console.log("an error of updating the user" + err);
                                        //                      res.json({errmsg: err});
                                    }
                                    else {
                                        //  res.json(requestoversentUser);
                                    }
                                });
                            }
                        });
                        // res.json(requesedtUser);


                    }
                });
            }
        });
    }
    res.json({state: true, msg: 'request send successfully'});
});

router.post("/mycircle", (req, res) => {

    getUsersInCircle(req.body.id, function (err, membersincircle) {
        if (err) {

            console.log("an error of retrieving mycircle" + err);

        }
        else {
            res.json(membersincircle);
        }

    });
});


getUsersInCircle = function (id, callback) {
    User.findOne({_id: id}, 'membersincircle', callback);
};


saveUserWithUpdatedProCount = function (userwithprojcount, callback) {
    userwithprojcount.save(callback);//save the new user to database and give a call back(which is come as a parameter to saveUser function) to the user.call back is the respond that gives when submited data.
    return userwithprojcount;
};


saveUserReq = function (userreq, callback) {
    userreq.save(callback);//save the new user to database and give a call back(which is come as a parameter to saveUser function) to the user.call back is the respond that gives when submited data.
    return userreq;
};


router.get('/allusers', function (req, res) {

    getUsers(function (err, users) {

        if (err) {
            console.log("data retrive error" + err);
        }
        else {
            res.json(users);

        }

    })


});

/**
 * @param callback
 */
getUsers = function (callback) {
    //console.log("oshin.....");
    User.find(callback);
};


router.post("/getRequests", (req, res) => {


    getUser(req.body.id, function (err, requestUser) {
        var i = 0;
        var id;
        var array = [];
        if (err) {

            console.log("an error of updating the user" + err);
            //     res.json({errmsg: err});
        }
        else {




            //     res.json(requestUser.requests);


            for (i; i < requestUser.requests.length; i++) {


                if (requestUser.requests[i].status == "false") {


                    array.push(requestUser.requests[i]);


                }


            }


            res.json(array);


        }


    });


});


getUser = function (id, callback) {

    User.findOne({_id: id}, 'requests', callback);

};


router.post("/notices", (req, res) => {


    getUser(req.body.id, function (err, requestUser) {
        var i = 0;

        var notices = [];
        if (err) {

            console.log("an error of updating the user" + err);
            //     res.json({errmsg: err});
        }
        else {


            console.log(requestUser.sentrequests.length);

            //     res.json(requestUser.requests);


            for (i; i < requestUser.sentrequests.length; i++) {


                if (requestUser.sentrequests[i].status == "true") {


                    notices.push(requestUser.sentrequests[i]);


                }


            }


            //console.log(notices);
            res.json(notices);


        }


    });


});

/**
 * @param id
 * @param callback
 */
getUser = function (id, callback) {

    User.findOne({_id: id}, 'requests', callback);

};


router.post("/confirmrequest", function (req, res) {
    getUser(req.body.id, function (err, requestUser) {
        var i = 0;
        var y = 0;
        var z = 0;
        var id;
        var sentrequeststatustrue;
        if (err) {
            console.log("an error " + err);
        }
        else {
            for (i; i < requestUser.requests.length; i++) {
                if (requestUser.requests[i].fromEmail == req.body.fromEmail) {
                    //id=requestUser.requests[i]._id;
                    requestUser.requests[i].status = "true";
                    saveUserReq(requestUser, function (err, requesedtUser) {
                        if (err) {
                            // console.log("an error of updating the user" + err);
                            res.json({errmsg: err});
                        }
                        else {
                            //   res.json(requesedtUser.requests);
                        }
                    });
                }
            }
        }
        findByEmail(req.body.fromEmail, function (err, reqsentuser) {

            if (err) {
                // console.log("an error of updating the user" + err);
                res.json({errmsg: err});
            }
            else {
                reqsentuser.membersincircle.push(requestUser);
                for (y; y < reqsentuser.sentrequests.length; y++) {

                    if (reqsentuser.sentrequests[y].toEmail == req.body.toEmail) {

                        // console.log("My accepted request =" + reqsentuser.sentrequests[y].toEmail)
                        reqsentuser.sentrequests[y].status = "true";
                        //  console.log("My accepted req details="+reqsentuser.sentrequests[y])
                        saveUserReq(reqsentuser, function (err, requestSentUser) {
                            if (err) {
                                // console.log("an error of updating the user" + err);
                                res.json({errmsg: err});
                            }
                            else {
                                res.json(requestSentUser.sentrequests);
                            }
                        });
                    }
                }
                //console.log("my sent req="+reqsentuser.sentrequests);
            }
        });
    });
});


//delete an user
router.delete('/myprofile/:_id', function (req, res) {

    deleteUser(req.params._id, function (err, deletedUSer) {
        if (err) {
            console.log("an error of deleting the user" + err);
        }
        else {
            res.json(deletedUSer);
        }
    });


});


router.put("/updateprofile/:_id", function (req, res) {

    const update = {
        username: req.body.username,
        name: req.body.name,
        adress: req.body.adress,
        contact: req.body.contact,
        occupation: req.body.occupation,
        skils: req.body.skils,
        userstatus: req.body.userstatus,

    };


    //   console.log(update);

    updateUserDetails(req.params._id, update, function (err, updatedUser) {


        if (err) {

            console.log("an error of updating the user" + err);
            res.json({errmsg: err});
        }
        else {


            res.json(updatedUser);
        }

    });


});


deleteUser = function (id, callback) {
    User.findByIdAndRemove(id, callback);
};


//get an user(a one user)

router.get('/showuser/:_id', function (req, res) {


    getUser(req.params._id, function (err, user) {
        if (err) {
            console.log("an error of getting the user" + err);
        }
        else {
            //  console.log(user);
            res.json(user);

        }

    });


});

/**
 * @param id
 * @param callback
 */
getUser = function (id, callback) {

    User.findById(id, callback);

};


updateUserDetails = function (id, update, callback) {

    User.findByIdAndUpdate(id, {$set: update}, callback);

};


//here if directs to this profile url without passport authentication it gives respond as unauthorize
//here authoization is happen through passport authentication here has no token which is given at the login time with authentication header.there for give respond as unauthorizatiin


module.exports = router;//need to export this file to use router by app.js