const mongoose=require('mongoose');
const schema=mongoose.Schema;


const memberprojectSchema=new schema({//create an object from schema type
    projectID:{type:Number},
    projectTitle:{type:String},
    dueDate:{type:Date},
    startDate:{type:Date},
    note:{type:String},
    projectmanger:{type:String},

    members:[{
        email:String,
        name:String,
        projectCount:Number,

    }],
    remainingdays:Number

});


module.exports=mongoose.model("memberProject",memberprojectSchema);


