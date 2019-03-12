$(document).ready(function () {

    $(document).on("click", "#search-quote-btn", function () {

        // prevent submit action
        event.preventDefault();


        // grab user input
        var departCity = $("#depart-city").val().trim();
        var arriveCity = $("#arrive-city").val().trim();
        var departDate = $("#depart-date").val().trim();
        var returnDate = $("#return-date").val().trim();
        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/"
            + departCity
            + "-sky/"
            + arriveCity
            + "-sky/"
            + departDate
            + "?inboundpartialdate="
            + returnDate;
        console.log(queryURL);


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "70b4bd87d4msh46110c5b4e371f1p11eccbjsn8595807c8dfe",
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "Postman-Token": "60c26db9-c8ba-43ca-aaff-ddfb24e440f2"
            },
            "data": ""
        }

        $.ajax(settings).done(function (result) {
            console.log("Result", result);
            createItin(result);

        });
    });

    $(document).on("click", "#search-date-btn", function () {

        // prevent submit action
        event.preventDefault();



        var departCity = $("#depart-city").val().trim();
        var arriveCity = $("#arrive-city").val().trim();
        var departDate = $("#depart-date").val().trim();
        var returnDate = $("#return-date").val().trim();
        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/"
            + departCity
            + "-sky/"
            + arriveCity
            + "-sky/"
            + departDate
            + "?inboundpartialdate="
            + returnDate;
        console.log(queryURL);


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "70b4bd87d4msh46110c5b4e371f1p11eccbjsn8595807c8dfe",
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "Postman-Token": "60c26db9-c8ba-43ca-aaff-ddfb24e440f2"
            },
            "data": ""
        }

        $.ajax(settings).done(function (result) {
            console.log("Result", result);
            createItin(result);

        });
    });


    function createItin(result) {
        $("#flight-sked > tbody").empty();


        var quotes = result.Quotes;
        var carriers = result.Carriers;
        var places = result.Places;
        console.log("Quotes", quotes);
        console.log("Carriers", carriers);
        console.log("Places", places);


        for (var i = 0; i < quotes.length; i++) {
            var currentQuote = quotes[i];
            var departCity = lookupCity(currentQuote.OutboundLeg.OriginId, places).Name;
            var arriveCity = lookupCity(currentQuote.OutboundLeg.DestinationId, places).Name;
            var dDates = (currentQuote.OutboundLeg.DepartureDate).split("T");
            var departDate = moment(dDates[0], "YYYY-MM-DD").format("ddd MMM D");
            var departTime = moment(dDates[1], "HH:mm:ss").format("h:mm A");
            var flightPrice = Math.floor(currentQuote.MinPrice);
            var airline = lookupCarrier(currentQuote.OutboundLeg.CarrierIds[0], carriers);


            var flightRow = $("<tr>").append(
                $("<td>").text(departDate), // Date
                $("<td>").text(departTime), // Depart
                $("<td>").text(airline.Name),      // Airline
                $("<td>").text("$" + flightPrice), // Price
            );

            // Create label for table
            var flightCities = $("<div>").text(
                "Flights from " + departCity + " to " + arriveCity
            );

            // Append the new row to the table
            $("#flight-cities").html(flightCities);

            $("#flight-sked > tbody").append(flightRow);


        };
    };

    function lookupCity(ID, places) {
        for (var i = 0; i < places.length; i++) {
            if (places[i].PlaceId === ID) {
                return places[i]
            };
        };
    };

    function lookupCarrier(ID, carriers) {
        for (var i = 0; i < carriers.length; i++) {
            if (carriers[i].CarrierId === ID) {
                return carriers[i]
            };
        };
    };

});
