module.exports={
    "database":"mongodb://localhost:27017/authapp", //here creating the path to mongodb(authapp's db)(test is by default name of the mongo db but we create another db to this application call authapp)
    "secret":"myapplicationsecretkey"               //in windows and linux db port is 27017

};


//to use this database(authapp) inside the app.js,this object need to export.
