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
  var user_first_name = document.querySelector('#Fname').value;
  var user_last_name = document.querySelector('#Lname').value;
  var user_email = document.querySelector('#Email').value;
  var user_password = document.querySelector('#register_password').value;
  var user_confirm_password = document.querySelector('#confirm_register_password').value;
  var user_type = document.querySelector('input[name="userType"]:checked').value;
  var user_phone_number = "000-000-0000";
  // check to see if any form field is empty
  if (user_first_name == "" || user_last_name == "" || user_email == "" || user_password == "" || user_confirm_password == "") {
    alert("Please make sure to fill out all form fields");
  } else {
    if (user_password != user_confirm_password) {
        alert("Please make sure that password and confirmation password match");
    } else {
      // Attempt to create new user
      firebase.auth().createUserWithEmailAndPassword(user_email, user_password).then(function(user) {
        db.collection("users").doc(user_email).set({
           first_name: user_first_name,
           last_name: user_last_name,
           email: user_email,
           password: user_password,
           type: user_type,
           phone: user_phone_number
        });
        alert("registration successful! Please login");
        window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw5/bootstrap/loginBootstrap.html");
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          console.log(errorMessage);
          alert("This user email already exists. Please log-in or use a different email for registration");
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#register_button').addEventListener('click', function () {register_user();}, false);
}, false);
