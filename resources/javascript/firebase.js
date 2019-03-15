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
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  console.log("ui", ui);
  
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'landing.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  ui.start('#firebaseui-auth-container', uiConfig);
  
  // console.log(ui);
  // userId = ui.auth().currentUser.uid;
  // console.log(userId);
  
  
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
  })
  // logOut function
function logOut() {
firebase.auth().signOut();
console.log("signOUt");
}
firebase.logOut = logOut;
})();
