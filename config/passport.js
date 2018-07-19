const config=require('./database');
const User=require('../models/user');

const JwtStrategy = require('passport-jwt').Strategy;//here reqire the passport-jwt and define Strategy(there are many type of strategy)
 const  ExtractJwt = require('passport-jwt').ExtractJwt;//stategy was extracted here
const opts = {};//here is an empty object call option
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//token will send through autherization header
opts.secretOrKey = config.secret;//here set the secret key in database object

module.exports=function (passport) {//here put this methode and export to use this inside app.js


    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log(jwt_payload);
        finduserById({_id:jwt_payload.user._id}, function (err, user) {//here find the user by id and here id is define as _id cz in the collection in mongo db id is define as _id
            if (err) {                                          //here  need to define as {_id:jwt_payload._user_id}//here {_id:jwt_payload._user_id} need to use insted of _doc_ need to use collection name here it is user other wise when authentication this will result  with always first user in the db

                return done(err, false);
            }
            if (user) {

                return done(null, user);
            } else {
                return done(null, false);

            }
        });
    }));
};


finduserById = function (id, callback) {
    User.findOne(id, callback);

};
