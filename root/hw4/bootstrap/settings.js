var registered_users = localStorage;

function displayStorageContent() {
  for (users in registered_users) {
    var retrievedObject = registered_users.getItem(users);
    var user = JSON.parse(retrievedObject);
    alert("{first_name : " + user.first_name + ", " + "last_name : " + user.last_name + ", " + "email : " + user.email + ", " + "password : " + user.password + ", " + "type : " + user.type + "}");
  }
}

function displayCurrentUser() {
  var current_user_email = registered_users.getItem("current_user");
  alert("The current user email is: " + current_user_email);
}

window.addEventListener('DOMContentLoaded', function() {displayCurrentUser();}, false);
