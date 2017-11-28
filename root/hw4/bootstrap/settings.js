var registered_users = localStorage;

function displayStorageContent() {
  for (users in registered_users) {
    var retrievedObject = registered_users.getItem(users);
    var user = JSON.parse(retrievedObject);
    alert("{first_name : " + user.first_name + ", " + "last_name : " + user.last_name + ", " + "email : " + user.email + ", " + "password : " + user.password + ", " + "type : " + user.type + "}");
  }
}

function displayUserSettings() {
  var current_user_email = registered_users.getItem("current_user");
  var retrievedObject = registered_users.getItem(current_user_email);
  var current_user = JSON.parse(retrievedObject);
  document.querySelector('#setting_first_name').value = current_user.first_name;
  document.querySelector('#setting_last_name').value = current_user.last_name;
  document.querySelector('#setting_email').value = current_user.email;
  document.querySelector('#setting_password').value = current_user.password;
}

window.addEventListener('DOMContentLoaded', function() {displayUserSettings();}, false);
//id="setting_first_name"
//id="setting_last_name"
//id="setting_email"
//id="setting_password"
//id="setting_phone_number"
