var config = {
  apiKey: "AIzaSyBHPFZ_lh_iNcTNJSgZlbEku1DQdNnJ-mg",
  authDomain: "hw2-cse134b-3ffd9.firebaseapp.com",
  databaseURL: "https://hw2-cse134b-3ffd9.firebaseio.com",
  projectId: "hw2-cse134b-3ffd9",
  storageBucket: "hw2-cse134b-3ffd9.appspot.com",
  messagingSenderId: "525755574970"
};
firebase.initializeApp(config);
var db = firebase.firestore();

function login_user() {
  var login_email = document.querySelector('#Email').value;
  var login_password = document.querySelector('#Password').value;
  if (login_email == "" || login_password == "") {
    alert("complete all form fields");
  } else {
    firebase.auth().signInWithEmailAndPassword(login_email, login_password).then(function(user) {
      window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw5/bootstrap/dashboardBootstrap.html");
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorMessage);

      if (errorCode == 'auth/invalid-email') {
        alert("This email address is invalid, please try using a different email");

      } else if (errorCode == 'auth/user-not-found') {
        alert("This email address does not exist. Please Register or try a different email address");

      } else if (errorCode == 'auth/wrong-password') {
        alert("Password is incorrect. Please try again.");
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#login_button').addEventListener('click', function() {login_user();}, false);
}, false);
