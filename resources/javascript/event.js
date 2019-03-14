$(document).ready(function () {
 
    $("#run-search").on("click", function (event) {
        //Prevents the page from reloading on form submit.
        event.preventDefault();
        var city = $("#city-input").val().trim();

        $.ajax({
            "url": "https://api.seatgeek.com/2/events?venue.city=" + city + "&client_id=%20MTU3Mjk3MzV8MTU1MjQxMjMwMS40Nw&client_secret=1a02aa5dd9e60be247c7c822cb6b46a165cbc902e448434afcf44d242ebde6f3",
            "method": "GET",

        }).then(function (response) {
            console.log(response);


            var eventList = response.events;

            // Looping through the array of events
            for (var i = 0; i < eventList.length; i++) {
                //place to store event
                var event = eventList[i];
                var eventName = event.title;
                var eventOccur = moment(event.datetime_local);
                var eventDate = eventOccur.format('MMM Do YYYY');
                var eventTime = eventOccur.format("hh:mm A");
                var avgPrice = event.stats.average_price;
                var eventURL = $("<a target= '_blank'>").attr("href", event.venue.url).text("Link");
                
                console.log(eventURL)

                var eventObject = {
                "event": eventName,
                "event_date": eventDate,
                "event_time": eventTime,
                "average_price": avgPrice,
                "event_link": eventURL
                }

                // make it a string to be added to select link
                var eventObject = JSON.stringify(eventObject);
                var addLink = $("<a>");
                addLink.text("Add event");
                addLink.attr("data-save", eventObject);
                addLink.attr("href", "#");
                addLink.addClass("select-event badge badge-primary");

                // create row to append to table
                var eventRow = $("<tr>").append(
                $("<td>").text(eventName), 
                $("<td>").text(eventDate), 
                $("<td>").text(eventTime),
                $("<td>").text(avgPrice),    
                $("<td>").html(eventURL),
                $("<td>").html(addLink), 
                );
            $("#listing").append(eventRow);
            }
            function storeEvent(str){
                var newEvent = JSON.parse(str);
                database.ref('users/' + userID + '/event/').push(newEvent);
            }

            $(document).on("click", ".select-event", function () {
                var str = $(this).attr("data-save");
                console.log(str);
                storeEvent(str)
            })
        })

    })
})