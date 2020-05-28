var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Test 1",
        image: "https://cdn.pixabay.com/photo/2018/06/21/20/22/lamp-3489394__340.jpg",
        description: "blah blah blah..."
    },
    {
        name: "Test 2",
        image: "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "blah blah blah..."
    },
    {
        name: "Test 3",
        image: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "blah blah blah..."
    }
];
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed comments!");
    //          //add a few campgrounds
    //         data.forEach(function(seed){
    //             Campground.create(seed, function(err, campground){
    //                 if(err){
    //                     console.log(err)
    //                 } else {
    //                     console.log("added a campground");
    //                     //create a comment
    //                     Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was internet",
    //                             author: "Homer"
    //                         }, function(err, comment){
    //                             if(err){
    //                                 console.log(err);
    //                             } else {
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("Created new comment");
    //                             }
    //                         });
    //                 }
    //             });
    //         });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;