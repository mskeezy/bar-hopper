var express       = require("express");
var router        = express.Router();
var Campground    = require("../models/campground");
var middleware    = require("../middleware");

   //index Route - show all campgrounds
router.get("/campgrounds", function(req, res){
            
    
        //Get all Campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
            console.log(err)
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
            }
        });
        
        
        
});

 //Create --  add new campground to DB.
 
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
    
    //get data from forms to add to campgrounds array
    var name    = req.body.name;
    var image   = req.body.image;
    var desc    = req.body.description;
    var author  = {
                    id:       req.user._id,
                    username: req.user.username
    }
    var newCampground = {name: name, image: image, description:desc, author:author}
    //creat a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds
          
            res.redirect("/campgrounds");
        }
    });
    
    
});
  
  //New - Show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW============shows more info about a campground.
router.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
      Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
          if(err){
              console.log(err);
          }else{
              //render show template with that campground
              res.render("campgrounds/show", {campground: foundCampground});
          }
      });
          
      
      req.params.id
    
    
});

//Edit Campground Route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
          Campground.findById(req.params.id, function(err, foundCampground){
              if(err){
                  res.redirect("back");
              }
            res.render("campgrounds/edit", {campground: foundCampground});

          });
});      
    //otherwise redirect
    //if not, redirect
 


//Update Campground Route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
         //find and update correct campground
         Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
             if(err){
                res.redirect("/campgrounds"); 
             } else {
                 //redirect somewhere (show page)
                 res.redirect("/campgrounds/" + req.params.id);
             }
        });
         
});

//DESTROY Campground Route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
      
   });
});




module.exports = router;
