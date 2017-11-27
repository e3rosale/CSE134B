var registered_users = localStorage;
// register the user
function register_user() {
  var user_first_name = document.querySelector('#Fname').value;
  var user_last_name = document.querySelector('#Lname').value;
  var user_email = document.querySelector('#Email').value;
  var user_password = document.querySelector('#register_password').value;
  var user_confirm_password = document.querySelector('#confirm_register_password').value;
  var user_type = "player";
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
        var new_user = {first_name : user_first_name, last_name : user_last_name, email : user_email, password : user_password, type : user_type};
        registered_users.setItem(new_user.email, JSON.stringify(new_user));
        alert("registration successful! Please login");
        window.location.replace("https://hw2-cse134b-3ffd9.firebaseapp.com/hw4/bootstrap/loginBootstrap.html");
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
