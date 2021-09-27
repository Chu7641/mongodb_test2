var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000);

// mongoo
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hungboiloi:hungboiloi@cluster0.en9ex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);



//Models

// app.get("/add",function(req,res){
//     res.render("add")
// })
var Marvel=require("./models/marvel");

app.get("/add",function(req,res){
    var marvel=Marvel({
        Name:"Iron man",
        Image:"img-1",
        Level:19
    })
    marvel.save(function(err,){
        if(err) {
            res.json({"kq":0,"err":err});
        }
        else {
            res.json({"kq":1});

        }
    })
})
app.get("list",function(req,res){
    Marvel.find(function(err,){
        if(err) {
            res.json({"kq":0,"err":err});
        }
        else {
            res.json({"kq":1});

        }
    })
})

//  app.get("/",function(req,res){
//      var caption=new Marvel({
//          Name:"Caption",
//          Image:"cap.jpg",
//          Level:50
//      })
//      res.json(caption);
//  })

