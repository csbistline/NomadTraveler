var userId = "0Ctx4jd7qyfVdh11yKmmyAkU2Lm2"
console.log(userId);
// console.log(db);
var flights = [];
var flightRef;

var userRef = db.ref('/users/' + userId + '/flights/')

userRef.on("child_added", function (snapshot) {
    var nextFlight = snapshot.key;
    // console.log(nextFlight);

    // flights.push(nextFlight);
    flightRef = db.ref('/users/' + userId + '/flights/' + nextFlight + '/')
    flightRef.on("value", function (snap) {
        var fOrigin = snap.val().origin;
        var fDestination = snap.val().destination;
        var fTime = snap.val().time;
        var fDate = snap.val().date;
        var fPrice = snap.val().price;

        // create row to append to table
        var flightRow = $("<tr>").append(
            $("<td>").text(fDate), // Date
            $("<td>").text(fTime), // Depart
            // $("<td>").text(airline.Name),      // Airline
            $("<td>").text("$" + fPrice), // Price
            // $("<td>").html(addLink), // Price
        );


        // Append the new row and label to the table
        $("#flight-sked > tbody").append(flightRow);

    })


});
// console.log(flights);
// console.log(flights[0]);
// console.log(flights[1]);

// var path = '/users/' + userId + '/flights/' + flights[0];
// console.log(path);


// flightRef = db.ref('/users/' + userId + '/flights/' + flights[0])

// userRef.on("value", function (snapshot) {
//     console.log(snapshot);

// });



// var flightObject = {
//     "origin": currentQuote.OutboundLeg.OriginId,
//     "destination": currentQuote.OutboundLeg.DestinationId,
//     "date": dDates[0],
//     "time": dDates[1],
//     "price": flightPrice,
//     "budget": tripBudget
// };
