/**
 * Handles the sign in button press.
 */
(function () {
  


  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogIn = document.getElementById('btnLogIn');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogOut = document.getElementById('btnLogOut');


  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signWithEmailandPassword(email, pass);
    promise.catch(e => console.log(e.message));


  });

  // sign up
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailandPassword(email, pass);
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
