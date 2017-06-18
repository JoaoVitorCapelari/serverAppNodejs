var mongoose = require("mongoose");
var logger=require("winston"); // this retrieves default logger which was configured in log.js
logger.info("ServerSchema LOG");

//MONGOOSE/MODEL CONFIG
var serverSchema = new mongoose.Schema({
   title:        String,
   image:        String,
   model:        String,
   serialNumber: String,
   processor:    String,
   memory:       String,
   hd:           String,
   temperature:  String,
   powerStatus:  String,
   created: {type: Date, default: Date.now},
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

// var Server = mongoose.model("Server", serverSchema);

module.exports = mongoose.model("Server", serverSchema);