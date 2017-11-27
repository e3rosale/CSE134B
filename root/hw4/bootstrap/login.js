var registered_users = localStorage;
function login_user() {
  var login_email = document.querySelector('#Email').value;
  var login_password = document.querySelector('#Password').value;

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
      alert("about to replace");
      window.location.replace("https://www.w3schools.com");
    }
  }
}
function hello_world() {
  alert("Hello world!");
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#login_button').addEventListener('click', function() {hello_world();}, false);
}, false);
