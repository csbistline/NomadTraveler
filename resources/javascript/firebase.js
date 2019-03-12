var app_firebase = {};
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

})()