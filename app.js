var express = require("express");
var http = require("http");
var ejs = require("ejs");
var bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const hostname = "localhost";
const port = 3000;

var campgrounds = [
    { name: "Tree", image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"},
    { name: "Flower", image: "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg"},
    { name: "River", image: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"},
   ]
    

app.get("/", (req, res) => {
    res.render("landing");
}); 

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newobj = {name: name, image: image};

    campgrounds.push(newobj);
    res.redirect("/campgrounds");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});


//server listening route
app.listen(port, hostname, () => {
    console.log("Server is Connected!!");
});