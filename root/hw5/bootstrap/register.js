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

var user_first_name;
var user_last_name;
var user_email;
var user_password;
var user_confirm_password;
var user_type;
var user_phone_number;

db.collection("users").doc("null").set({
   first_name: "",
   last_name: "",
   email: "",
   password: "",
   type: "",
   phone: ""
});

db.collection("users").doc("null").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});

// register the user
function register_user() {
  user_first_name = document.querySelector('#Fname').value;
  user_last_name = document.querySelector('#Lname').value;
  user_email = document.querySelector('#Email').value;
  user_password = document.querySelector('#register_password').value;
  user_confirm_password = document.querySelector('#confirm_register_password').value;
  user_type = document.querySelector('input[name="userType"]:checked').value;
  user_phone_number = "000-000-0000";
  // check to see if any form field is empty
  if (user_first_name == "" || user_last_name == "" || user_email == "" || user_password == "" || user_confirm_password == "") {
    alert("Please make sure to fill out all form fields");
  } else {
    // check to see if user email is already registered
    var email_exists = false;
    console.log("The current user email is: ");
    console.log(user_email);
    db.collection("users").get().then(function(querySnapshot) {
  		querySnapshot.forEach(function(doc) {
  			if (doc.data().email == user_email) {
          console.log("The doc data email is: ");
          console.log(doc.data().email);
          console.log("The value of email exists is: (inside for loop)");
          email_exists = true;
          console.log(email_exists);
        }
  		});
  	});
    console.log("The value of email_exists is: ");
    console.log(email_exists);
    if (email_exists) {
      alert("Email already exists. Please try logging in.");
    } else {
      // check that user email and confirm email are the same
      if (user_password != user_confirm_password) {
        alert("Please make sure that password and confirmation password match");
      } else {
        // passwords match, proceed to create new registered user
        firebase.auth().createUserWithEmailAndPassword(user_email, user_password).catch(function(error) {
        // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
        db.collection("users").doc(user_email).set({
           first_name: user_first_name,
           last_name: user_last_name,
           email: user_email,
           password: user_password,
           type: user_type,
           phone: user_phone_number
        });
        alert("registration successful! Please login");
        //window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw5/bootstrap/loginBootstrap.html");
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#register_button').addEventListener('click', function () {register_user();}, false);
}, false);
