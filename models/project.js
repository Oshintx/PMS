const mongoose=require('mongoose');
const schema=mongoose.Schema;

const projectSchema=new schema({//create an object from schema type
    projectID:{type:Number},
    projectTitle:{type:String},
    dueDate:{type:Date},
    startDate:{type:Date},
    note:{type:String},
    projectmanger:{type:String},
                                        //the user that create project.-user tat records in the session
});

module.exports=mongoose.model("project",projectSchema);

