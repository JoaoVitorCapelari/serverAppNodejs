var express          = require("express"),
    app              = express(),
    expressSanitizer = require("express-sanitizer"),
    logger           = require("./logs/log.js"),
    methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    User             = require("./models/user"),
    Server           = require("./models/server"),
    localStrategy    = require("passport-local");
    
var serverRoutes = require("./routes/servers.js"),
    authRoutes   = require("./routes/index.js");


//APP CONFIG    
//mongoose.connect("mongodb://localhost/restfulserver_app");
mongoose.connect(process.env.DATABASEURL);
//console.log(process.env.DATABASEURL);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "cats are the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

var passportLocalMongoose = require("passport-local-mongoose");

app.use(authRoutes);
app.use(serverRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running"); 
});


