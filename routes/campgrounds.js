var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.post("/", middleware.isLoggedIn,(req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newobj = {name: name, image: image, description: description, author: author };

    //create new campground
    Campground.create(newobj, (err, newlyCreated) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds/new");
        } else {
            res.redirect("/campgrounds");       
        }
    })
    
});

router.get("/", (req, res) => {
    //Get All the campgrounds
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});     
        }
    });
});

router.get("/new", middleware.isLoggedIn,(req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {

    //find 
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //show
            res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
});


//Edit Campground Routes

router.get("/:id/edit", middleware.checkAuthorization, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


//update campground routes
router.put("/:id", middleware.checkAuthorization, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//Destroy Campground Route
router.delete("/:id", middleware.checkAuthorization, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;