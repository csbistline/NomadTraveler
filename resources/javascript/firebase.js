var app_firebase = {};
var db = {};
var userId;

(function () {
  var config = {
    apiKey: "AIzaSyA9xnax8HPQbzeKX1sHpzmyeKa3M0djyY8",
    authDomain: "nomad-traveler.firebaseapp.com",
    databaseURL: "https://nomad-traveler.firebaseio.com",
    projectId: "nomad-traveler",
    storageBucket: "",
    messagingSenderId: "536751174261"
  };
  firebase.initializeApp(config);
  app_firebase = firebase;
  db = app_firebase.database();
})()

    // create a directory for the user
    app_firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          // User is signed in.
          userId = user.uid;
          userName = user.displayName;
          userEmail = user.email;
          db.ref('users/' + userId).set({
              uid: userId,
              name: userName,
              email: userEmail
          });
      } else {
          // No user is signed in.
      }
    });
