var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");
var logger=require("winston"); // this retrieves default logger which was configured in log.js
logger.info("AuthRoutes and Logic LOGs");

//==============
//ROOT ROUTE
//==============
router.get("/", function(req, res){
   res.redirect("/servers"); 
});


//==============
//AUTH ROUTES
//==============

//REGISTER FORM
router.get("/register", function(req, res) {
   res.render("register"); 
});

//SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      } 
        passport.authenticate("local")(req, res, function(){
           res.redirect("/servers"); 
        });
   });
});

//LOGIN FORM
router.get("/login", function(req, res) {
   res.render("login"); 
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local", {successRedirect: "/servers", failure: "/login"}), function(req, res) {
});

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out");
   res.redirect("/servers");
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}



module.exports = router;