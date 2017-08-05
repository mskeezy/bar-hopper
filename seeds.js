var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment")

var data        = [
    {
        name: "Eagle Run",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCo-Vz9Crx3BMpeoLuHIDuDe1LL-zCf-U8RwV9goAL0XBzzTQGg",
        description: "Bacon ipsum dolor amet drumstick turducken biltong t-bone pig ribeye, boudin alcatra shoulder sirloin pastrami bacon. Pork belly tongue ribeye sausage andouille tri-tip tail bresaola shankle. Pork chuck tri-tip t-bone tongue spare ribs. Picanha tri-tip spare ribs, doner boudin salami ham beef ribs filet mignon. Ribeye t-bone porchetta cupim short loin frankfurter turducken filet mignon leberkas sirloin tenderloin rump bresaola strip steak cow. Pork corned beef ground round ham hock rump beef sirloin flank biltong ball tip cow."
    },
    {
        name: "Widows Peak",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGOywUT72ze1N4V3u7OSt530ZS5I8DlBOwRBkYjl9GLEHOmAZ5A",
        description: "Bacon ipsum dolor amet drumstick turducken biltong t-bone pig ribeye, boudin alcatra shoulder sirloin pastrami bacon. Pork belly tongue ribeye sausage andouille tri-tip tail bresaola shankle. Pork chuck tri-tip t-bone tongue spare ribs. Picanha tri-tip spare ribs, doner boudin salami ham beef ribs filet mignon. Ribeye t-bone porchetta cupim short loin frankfurter turducken filet mignon leberkas sirloin tenderloin rump bresaola strip steak cow. Pork corned beef ground round ham hock rump beef sirloin flank biltong ball tip cow."
    },
    {
        name: "21 Savage",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_VgGOIrcY-ClXskkQrbg6lMSuD6XGA85QEy6sJyoyQFAABhkVJA",
        description: "Bacon ipsum dolor amet drumstick turducken biltong t-bone pig ribeye, boudin alcatra shoulder sirloin pastrami bacon. Pork belly tongue ribeye sausage andouille tri-tip tail bresaola shankle. Pork chuck tri-tip t-bone tongue spare ribs. Picanha tri-tip spare ribs, doner boudin salami ham beef ribs filet mignon. Ribeye t-bone porchetta cupim short loin frankfurter turducken filet mignon leberkas sirloin tenderloin rump bresaola strip steak cow. Pork corned beef ground round ham hock rump beef sirloin flank biltong ball tip cow."
    }
    ]

function seedDB(){
    //remove all campgrounds
  Campground.remove({}, function(err){
       
    if(err){
        console.log(err);
    } 
     console.log("Campgrounds Removed!!!");

    }); 
    //add a few campgrounds
    data.forEach(function(seed){
         Campground.create(seed,function(err,campground){
            if(err){
                console.log(err)
            } else{
                console.log("Campground added")
                //create comment
                Comment.create(
                    {
                    text: "Nice but really cold and loud at night",
                    author: "Earl"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    } else{
                         campground.comments.push(comment);
                         campground.save();
                         console.log("Created new comment");
                    }
                   
                });
            }
         })
    });
   
    
    
    
}

module.exports = seedDB;
