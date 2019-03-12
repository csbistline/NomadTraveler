/**
 * Handles the sign in button press.
 */
(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9xnax8HPQbzeKX1sHpzmyeKa3M0djyY8",
    authDomain: "nomad-traveler.firebaseapp.com",
    databaseURL: "https://nomad-traveler.firebaseio.com",
    projectId: "nomad-traveler",
    storageBucket: "",
    messagingSenderId: "536751174261"
  };
  firebase.initializeApp(config);
  


  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogOut = document.getElementById('btnLogOut');


  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));


  });

  // sign up
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });

  btnLogOut.addEventListener('click', e => {
    firebase.auth().sginOut();

  });


  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogOut.classList.remove("hide");
    } else {
      console.log("not logged in")
      btnLogOut.classList.add('hide');
    }
  });

















});
