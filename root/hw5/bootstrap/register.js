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
//var citiesRef = db.collection("cities");
var registered_users = localStorage;

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
    for (users in registered_users) {
      if (users == user_email) {
        email_exists = true;
        break;
      }
    }
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
        var new_user = {first_name : user_first_name, last_name : user_last_name, email : user_email, password : user_password, type : user_type, phone : user_phone_number};
        registered_users.setItem(new_user.email, JSON.stringify(new_user));
        alert("registration successful! Please login");
        window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw5/bootstrap/loginBootstrap.html");
      }
    }
  }
}

function displayStorageContent() {
  for (users in registered_users) {
    var retrievedObject = registered_users.getItem(users);
    var user = JSON.parse(retrievedObject);
    alert("{first_name : " + user.first_name + ", " + "last_name : " + user.last_name + ", " + "email : " + user.email + ", " + "password : " + user.password + ", " + "type : " + user.type + "}");
  }
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#register_button').addEventListener('click', function () {register_user();}, false);
}, false);
