var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here



var middlewareObj = {};

middlewareObj.checkAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                req.flash("error", "Campgound not found!!");
                res.redirect("back");
            } else {
                //does users own campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission Denied!!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in!!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentAuth = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission Denied!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in!!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in!!");
    res.redirect("/login");
}

module.exports = middlewareObj;