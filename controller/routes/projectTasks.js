const express=require('express');
const router=express.Router();

router.get('/showtask/:_id',function (req,res) {

    getProject(req.params._id,function(err,project){
        if(err){
            console.log("an error of getting the user"+err);
        }
        else{
            console.log(project);
            res.json(project);
        }
    });

});


getProject=function(id,callback){
    project.findById(id,callback);
};

module.exports = router;


//TODO Delete asap