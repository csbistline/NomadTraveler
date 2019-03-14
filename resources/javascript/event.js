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
                var eventName = $("<td>").text(event.title);
                var eventURL = $("<a>").attr("href", event.url).text("link");
                var eventOccur = moment(event.datetime_local);
                var eventDate = eventOccur.format('MMM Do YYYY');
                var eventTime = eventOccur.format("hh:mm A");
                $("#listing").append("<tr>", eventName, "<td>" + eventDate,"<td>" + eventTime, eventURL);
            }



        })

    })
})