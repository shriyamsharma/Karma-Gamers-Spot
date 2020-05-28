var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//==============
// Routes
//==============


router.get("/", (req, res) => {
    res.render("landing");
}); 


//==============
//Auth Routes
//==============

router.get("/register", (req, res) => {
    res.render("register");
});

//Sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to karmaSharma, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,(req, res) => {

});

//logout Logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;