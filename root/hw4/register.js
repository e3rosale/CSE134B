var registered_users = localStorage;

// register the user
function register_user() {
  var user_first_name = document.querySelector('#register_first_name').value;
  var user_last_name = document.querySelector('#register_last_name').value;
  var user_email = document.querySelector('#register_email').value;
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
        email_exists= true;
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
        var new_user = {first_name: user_first_name, last_name: user_last_name, email: user_email, password: user_password, type: user_type}
        registered_users.setItem(new_user.email, JSON.stringify(new_user));

        for (users in registered_users) {
          var retrievedObject = registered_users.getItem(users);
          var user = JSON.parse(retrievedObject);

          document.write("first name: " + user.first_name + "<br>");
          document.write("last name: " + user.last_name + "<br>");
          document.write("email: " + user.email + "<br>");
          document.write("password: " + user.password + "<br>");
          document.write("type: " + user.type + "<br><br>");
        }
        window.location.replace("login.html")
      }
    }
  }
}



window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#register_button').addEventListener('click', function () {register_user();}, false);
}, false);
