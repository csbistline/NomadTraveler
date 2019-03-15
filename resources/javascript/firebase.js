var db = {};

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
})();


(function(){

    // create a directory for the user
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          // User is signed in.
          userId = user.uid;
          userName = user.displayName;
          userEmail = user.email;
          db.ref('users/' + userId + '/details/').set({
              uid: userId,
              name: userName,
              email: userEmail
          })
      } else {
        // redirect back to logIn page
        userId = null;

        window.location.replace("index.html");
        console.log("logOUt");
        
          // No user is signed in.
      }
    });
    // logOut function
function logOut() {
  firebase.auth().signOut();
  console.log("signOUt");
}
db.logOut = logOut;
})();