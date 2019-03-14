$(document).ready(function () {

    // console.log("ready");

    // ==================================
    // GLOBAL VARIABLES
    // ================================== 
    var tripBudget;
    var userId;

    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyC4jU3Rp6zvHA7Srnzj9ueT2rD6dbwMuVo",
    //     authDomain: "testproject-1abc2.firebaseapp.com",
    //     databaseURL: "https://testproject-1abc2.firebaseio.com",
    //     projectId: "testproject-1abc2",
    //     storageBucket: "testproject-1abc2.appspot.com",
    //     messagingSenderId: "463399312243"
    // };
    // firebase.initializeApp(config);
    var db = app_firebase.database();

    // create a directory for the user
    app_firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(user);
            userId = user.uid;
            userName = user.displayName;
            userEmail = user.email;
            db.ref('users/' + userId).set({
                uid: userId,
                name: userName,
                email: userEmail
                //   email: email
                //some more user data
            });
        } else {
            // No user is signed in.
        }
      });



// ==================================
// OBJECTS
// ==================================



// ==================================
// FUNCTIONS
// ==================================

$(document).on("click", "#search-date-btn", function () {
    // prevent submit action
    event.preventDefault();

    // grab user input
    var departCity = $("#depart-city").val().trim();
    var arriveCity = $("#arrive-city").val().trim();
    var departDate = $("#depart-date").val().trim();
    console.log(departDate);

    tripBudget = parseInt($("#budget-amount").val().trim());
    var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/"
        + departCity
        + "-sky/"
        + arriveCity
        + "-sky/"
        + departDate
    console.log(queryURL);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "70b4bd87d4msh46110c5b4e371f1p11eccbjsn8595807c8dfe",
            "Content-Type": "application/x-www-form-urlencoded",
            // "cache-control": "no-cache",
            // "Postman-Token": "60c26db9-c8ba-43ca-aaff-ddfb24e440f2"
        },
        "data": ""
    }

    $.ajax(settings).done(function (result) {
        // console.log("Result", result);
        createItin(result);

    });
});

// create flight itinerary 
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
        var departCity = lookupCity(currentQuote.OutboundLeg.OriginId, places).CityName;
        var arriveCity = lookupCity(currentQuote.OutboundLeg.DestinationId, places).CityName;
        var dDates = (currentQuote.OutboundLeg.DepartureDate).split("T");
        var departDate = moment(dDates[0], "YYYY-MM-DD").format("ddd MMM D");
        var departTime = moment(dDates[1], "HH:mm:ss").format("h:mm A");
        var flightPrice = Math.floor(currentQuote.MinPrice);
        var airline = lookupCarrier(currentQuote.OutboundLeg.CarrierIds[0], carriers);

        // create object of flight record
        var flightObject = {
            "origin": currentQuote.OutboundLeg.OriginId,
            "destination": currentQuote.OutboundLeg.DestinationId,
            "date": dDates[0],
            "time": dDates[1],
            "price": flightPrice,
            "budget": tripBudget
        };

        // make it a string to be added to select link
        flightObject = JSON.stringify(flightObject);
        var addLink = $("<a>");
        addLink.text("Add flight");
        addLink.attr("data-save", flightObject);
        addLink.attr("href", "#");
        addLink.addClass("select-flight badge badge-primary");

        // create row to append to table
        var flightRow = $("<tr>").append(
            $("<td>").text(departDate), // Date
            $("<td>").text(departTime), // Depart
            $("<td>").text(airline.Name),      // Airline
            $("<td>").text("$" + flightPrice), // Price
            $("<td>").html(addLink), // Price
        );

        // Create label for table
        var flightCities = $("<div>").text(
            "Flights from " + departCity + " to " + arriveCity
        );

        // Append the new row and label to the table
        $("#flight-cities").html(flightCities);
        $("#flight-sked > tbody").append(flightRow);
    };
};

// look up places info
function lookupCity(ID, places) {
    for (var i = 0; i < places.length; i++) {
        if (places[i].PlaceId === ID) {
            return places[i]
        };
    };
};

// look up carrier info
function lookupCarrier(ID, carriers) {
    for (var i = 0; i < carriers.length; i++) {
        if (carriers[i].CarrierId === ID) {
            return carriers[i]
        };
    };
};

// store flight to firebase
function storeFlight(str) {
    var newFlight = JSON.parse(str);
    db.ref('users/' + userId + '/flights/').push(newFlight);
};

$(document).on("click", ".select-flight", function () {
    var str = $(this).attr("data-save");
    console.log(str);
    storeFlight(str);
});

});
// var mainApp = {};

// (function () {
//     var firebase = app_firebase;
//     var uid = null;
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             uid = user.uid;
//         } else {
//             uid = null;
//             window.location.replace("index.html")
//         }

//     });
//     function logOut() {
//         firebase.auth().signOut();

//     }
//     mainApp.logOut = logOut;

// })()