// var userId = "0Ctx4jd7qyfVdh11yKmmyAkU2Lm2"
var userId;

(function () {
app_firebase.auth().onAuthStateChanged(function (user) {
        // User is signed in.
        userId = user.uid;
        console.log(userId);
// console.log(db);
var flights = [];
var flightRef;

var userRef = db.ref('/users/' + userId + '/flights/')

// jump to the selected user's flights
userRef.on("child_added", function (snapshot) {
    var nextFlight = snapshot.key;
    console.log(nextFlight);
    
    // scrape the flights info from the database
    flightRef = db.ref('/users/' + userId + '/flights/' + nextFlight + '/')
    flightRef.on("value", function (snap) {
        var fOrigin = snap.val().origin;
        var fDestination = snap.val().destination;
        var fAirline = snap.val().airline;
        var fTime = snap.val().time;
        var fDate = snap.val().date;
        var fPrice = snap.val().price;

        // remove button
        var fRemove = $("<a>");
        fRemove.text("Delete flight");
        fRemove.attr("data-flight", nextFlight);
        fRemove.attr("href", "#");
        fRemove.addClass("remove-flight badge badge-primary");

        // create row to append to table
        var flightRow = $("<tr>").append(
            $("<td>").text(fDate), // Date
            $("<td>").text(fOrigin), // Depart
            $("<td>").text(fDestination), // Depart
            $("<td>").text(fAirline), // Airline
            $("<td>").text("$" + fPrice), // Price
            $("<td>").html(fRemove), // Delete button
        );

        // Append the new row and label to the table
        $("#flight-sked > tbody").append(flightRow);
    })
});

        
})
})();


$(document).on("click", ".remove-flight", function () {
    var fKey = $(this).attr("data-flight");
    var fDelete = db.ref('/users/' + userId + '/flights/');
    console.log(fDelete);
    console.log(fKey);
    fDelete.child(fKey).remove();
    location.reload();
});