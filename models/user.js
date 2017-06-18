var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var logger=require("winston"); // this retrieves default logger which was configured in log.js
logger.info("UserSchema LOG");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String
}); 

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);