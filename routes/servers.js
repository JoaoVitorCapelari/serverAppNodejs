var express = require("express");
var router  = express.Router();
var Server  = require("../models/server");
var logger=require("winston"); // this retrieves default logger which was configured in log.js
logger.info("Full CRUD Routes and Logic LOGs");



//INDEX ROUTE
router.get("/servers", function(req, res){
    Server.find({}, function(err, servers){
       if (err){
           console.log(err);
       } else {
           res.render("index", {servers: servers, currentUser: req.user});
       }
    });
});

//CREATE - add new server to DB
router.post("/servers", isLoggedIn, function(req, res){
    // get data from form and add to server array
    var title        = req.body.title;
    var image        = req.body.image;
    var model        = req.body.model;
    var serialNumber = req.body.serialNumber;
    var processor    = req.body.processor;
    var memory       = req.body.memory;
    var hd           = req.body.hd;
    var temperature  = req.body.temperature;
    var powerStatus  = req.body.powerStatus;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newServer = {title: title, image: image, model: model, serialNumber: serialNumber,
                     processor: processor, memory: memory, hd: hd, temperature: temperature,
                     powerStatus: powerStatus, author: author};
    // Create a new server and save to DB
    Server.create(newServer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to server page
            console.log(newlyCreated);
            res.redirect("/servers");
        }
    });
});

//NEW ROUTE
router.get("/servers/new", isLoggedIn, function(req, res) {
   res.render("new"); 
});

//SHOW ROUTE
router.get("/servers/:id", function(req, res) {
   Server.findById(req.params.id, function(err, foundServer){
      if(err){
          res.redirect("/servers");
      } else {
          res.render("show", {server: foundServer});
      }
   }); 
});

//EDIT ROUTE
router.get("/servers/:id/edit", checkServerOwnership, function(req, res) {
    Server.findById(req.params.id, function(err, foundServer){
        res.render("edit", {server: foundServer});
        });
      });


//UPDATE ROUTE
router.put("/servers/:id", function(req, res){
   Server.findByIdAndUpdate(req.params.id, req.body.server, function(err, updatedServer){
      if(err){
          res.send("/servers");
      } else {
          res.redirect("/servers/" + req.params.id);
      }
   }); 
});


//DELETE ROUTE
router.delete("/servers/:id", checkServerOwnership, function(req, res){
   Server.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/servers");
      } else {
         res.redirect("/servers");
      }
   });
});

//Middleware
function checkServerOwnership(req, res, next){
 if(req.isAuthenticated()){
        Server.findById(req.params.id, function(err, foundServer){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the server?
            if(foundServer.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}


module.exports = router;