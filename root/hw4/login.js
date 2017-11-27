var registered_users = localStorage;
function login_user() {
  var login_email = document.querySelector('#login_email').value;
  var login_password = document.querySelector('#login_password').value;

  if (login_email == "" || login_password == "") {
    alert("complete all form fields");
  } else {
    var is_registered = false;
    for (users in registered_users) {
      var retrievedObject = registered_users.getItem(users);
      var user = JSON.parse(retrievedObject);
      if (user.email == login_email && user.password == login_password) {
        is_registered = true;
        break;
      }
    }
    if (!is_registered) {
      alert("This email is not registered, please proceed to register page");
    } else {
      window.location.replace("dashboard.html");
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#login_button').addEventListener('click', function() {login_user();}, false);
}, false);
