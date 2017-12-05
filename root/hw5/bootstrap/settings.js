var registered_users = localStorage;

function return_person_object_literal() {
  var current_user_email = registered_users.getItem("current_user");
  var retrievedObject = registered_users.getItem(current_user_email);
  return JSON.parse(retrievedObject);
}

function updateUserSettings() {
  var updated_first_name = document.querySelector('#setting_first_name').value;
  var updated_last_name = document.querySelector('#setting_last_name').value;
  var updated_email = document.querySelector('#setting_email').value;
  var updated_password = document.querySelector('#setting_password').value;
  var updated_phone_number = document.querySelector('#setting_telephone').value;
  var current_user_email = registered_users.getItem("current_user");
  // make sure that the user setting fields are non empty, except for user telephone.
  if (updated_first_name == "" || updated_last_name == "" || updated_email == "" || updated_password == "") {
    alert("Please fill in all form fields. Telephone number is optional");
  } else  {
    // if the user email is unchanged, update the rest of the fields
    if (updated_email != current_user_email) {
      // user email is updated, so we now check persistent storage to make sure that the email is not already taken
      var email_exists = false;
      for (users in registered_users) {
        if (users == updated_email) {
          email_exists = true;
          break;
        }
      }
      if (email_exists) {
        alert("This email already exists. Please try a different email address");
        return;
      } else {
        // now make sure to get rid of the last string literal with "old" email key and update the current user
        registered_users.removeItem(current_user_email);
        registered_users.setItem("current_user", updated_email);
        alert("User settings have been updated successfully!");
      }
    }
    if (updated_phone_number == null) {
      updated_phone_number = "";
      alert("phone value was null, now it is empty string");
    }
    var current_user = return_person_object_literal();
    var update_user = {first_name : updated_first_name, last_name : updated_last_name, email : updated_email, password : updated_password, type : current_user.type, phone : updated_phone_number};
    registered_users.setItem(update_user.email, JSON.stringify(update_user));
  }
}

function displayUserSettings() {
  var current_user = return_person_object_literal();
  document.querySelector('#setting_first_name').value = current_user.first_name;
  document.querySelector('#setting_last_name').value = current_user.last_name;
  document.querySelector('#setting_email').value = current_user.email;
  document.querySelector('#setting_password').value = current_user.password;
  document.querySelector('#setting_telephone').value = current_user.phone;

  // bind all button elements to respective functions

}

window.addEventListener('DOMContentLoaded', function() {
  displayUserSettings();
  document.querySelector('#save_button').addEventListener('click', function() {updateUserSettings();}, false);
}, false);

/*
function displayStorageContent() {
  for (users in registered_users) {
    var retrievedObject = registered_users.getItem(users);
    var user = JSON.parse(retrievedObject);
    alert("{first_name : " + user.first_name + ", " + "last_name : " + user.last_name + ", " + "email : " + user.email + ", " + "password : " + user.password + ", " + "type : " + user.type + "}");
  }
}
*/
