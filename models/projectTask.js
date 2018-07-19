const mongoose=require('mongoose');
const schema=mongoose.Schema;

const projectTaskSchema=new schema({//create an object from schema type
    projectTitle:{type:String},
    tasks:[{
        taskTitle:String,
        taskDueDate:Date,
        taskStartDate:Date,
        taskWeight:String,
        extraDetails:String,
        members:[String],
        status:String

    }],//if need to store objects in an array need to specify properties like above

});


const project=module.exports=mongoose.model("ProjectTask",projectTaskSchema);




