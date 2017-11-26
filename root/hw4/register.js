// once we get all of the data from the form, we first check the email account.
// if email account is in registered_users object, prompt user that email already exists, please try logging in
// else if email does not exist, check that password and re-enter password match, if not, prompt user to try password field again.
// once the passwords match, create a new user object.

// register the user
function register_user() {
  var user_first_name = document.querySelector('#register_first_name').value;
  var user_last_name = document.querySelector('#register_last_name').value;
  var user_email = document.querySelector('#register_email').value;
  var user_password = document.querySelector('#register_password').value;
  var user_confirm_password = document.querySelector('#confirm_register_password').value;

  // check to see if any form field is empty
  if (user_first_name == "" || user_last_name == "" || user_email == "" || user_password == "" || user_confirm_password == "") {
    alert("Please make sure to fill out all form fields");
  } else {
    // check to see if user email is already registered
    var email_already_exist = 0;
    for (users in registered_users) {
      alert(registered_users[users].first_name);
      if (registered_users[users].email == user_email) {
        email_already_exist = 1;
        break;
      }
    }
    if (email_already_exist) {
      alert("Email already exists. Please try logging in.");
    } else {
      // check that user email and confirm email are the same
      if (user_password != user_confirm_password) {
        alert("Please make sure that password and confirmation password match");
      } else {
        // passwords match, proceed to create new registered user
        registered_users.push({
          first_name: user_first_name,
          last_name: user_last_name,
          email: user_email,
          password: user_password,
          type: "player"
        });
      }
    }
  }
}



window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#register_button').addEventListener('click', function () {register_user();}, false);
}, false);
