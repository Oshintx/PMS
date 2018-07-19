//this is a user collection(user table)
//this is a schema

const mongoose = require('mongoose');//Load module mongo here again that is in node modules -here using mongoose there for reqire mongoose.
const scema = mongoose.Schema;//load schema module that is in mongoose-to create a scema
const bcrypt = require('bcryptjs');//import(load) the bcrypt module-We installed this and it goes to package.json and now it is in node_modules-this is reqired to encrypt the password


const userSchema = new scema({//create an object from schema type
    username: {type: String, required: true },
    name: {type: String, required: true, },
    email: {type: String, required: true,unique:true},
    role: {type: String},
    projectCount: {type: Number},
    gender:{type: String},
    adress:{type: String},
    contact:{type: String},
    skils:{type:String},
    occupation:{type: String},


    requests:[{
        fromName:String,
        fromEmail:String,
        tonName:String,
        toEmail:String,
        status:String
    }],

    sentrequests:[{
        tonName:String,
        toEmail:String,
        status:String
    }],


    membersincircle:[{
        username:String,
        name:String,
        email:String,
        role:String,
        projectCount:String
    }],





    password: {type: String, required: true}


});


module.exports = mongoose.model("user", userSchema); //here export mongoose model from the name user and export the schema userSchema that in user model












