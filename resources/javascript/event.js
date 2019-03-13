$(document).ready(function() {
    
    $("#run-search").on("click", function(event) {
        //Prevents the page from reloading on form submit.
        event.preventDefault();
        var city = $("#city-input").val().trim();
        
        $.ajax({
           "url":"https://api.seatgeek.com/2/events?venue.city=" + city + "&client_id=%20MTU3Mjk3MzV8MTU1MjQxMjMwMS40Nw&client_secret=1a02aa5dd9e60be247c7c822cb6b46a165cbc902e448434afcf44d242ebde6f3",
            "method": "GET",

        }).then(function(response) {
            
            var results = response.events;
            
            // Looping through the array of events
            for (var i = 0; i < results[i].title.length; i++) {
                //place to store event
                console.log(results[i].title);
            
            
            //     // Retrieving the URL for the image
            //     var imgURL = results[i].performers.image;
            //     console.log(imgURL);
            //   // Creating an ent to hold the image
            //     var image = $("<img>").attr("src", imgURL);
    
            //   // Appending the image
            //     eventDiv.append(image);
    
              
            
            }
            
            

        })
      
    })
})
