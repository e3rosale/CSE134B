////////////////////// FIREBASE INIT //////////// //////////
var config = {
	apiKey: "AIzaSyBHPFZ_lh_iNcTNJSgZlbEku1DQdNnJ-mg",
	authDomain: "hw2-cse134b-3ffd9.firebaseapp.com",
	databaseURL: "https://hw2-cse134b-3ffd9.firebaseio.com",
	projectId: "hw2-cse134b-3ffd9",
	storageBucket: "hw2-cse134b-3ffd9.appspot.com",
	messagingSenderId: "525755574970"
};
firebase.initializeApp(config);
const db = firebase.firestore();
///////////////////////////////////////////////////////////////


// Variables to get the forms of new players and edit player to add and edit from roster
var playerForm = document.getElementById('addPlayerForm');
if(playerForm != null){
  playerForm.addEventListener('submit', savePlayer, false);
}


var playerToEdit = document.getElementById('editPlayerForm');
if (playerToEdit != null) {
	playerToEdit.addEventListener('submit', editPlayerCurr, false);
}


editThisPlayer = {};
captainBoolean = false;

/////// ///FIREBASE IS WEIRD. THIS NEEDS TO BE HERE ///////
db.collection("players").doc("null").set({
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	type: "",
	phone: ""
 });
 
 db.collection("players").doc("null").delete();
 ////////////////////////////////////////////////

/* 
 * 	Adds a new player to the roster and saves it in local storage
 */
function savePlayer(e) {
	console.log("in main");

  var playerFirstName = document.getElementById('playerFName').value;
  var playerLastName = document.getElementById('playerLName').value;
  var playerEmail = document.getElementById('playerEmail').value;
  var playerDOB = document.getElementById('playerDOB').value;
  var playerNumber = document.getElementById('playerJersey').value;
  var playerPosition = document.getElementById('playerPosition').value;
  var playerCaptain = (document.getElementById('playerCaptain').checked) ? true : false;
  var playerId = playerFirstName + "|" + playerLastName + "|" + playerNumber;



  // store in firestore //
  db.collection("players").doc(playerId).set({
	firstName: playerFirstName,
	lastName: playerLastName,
	email: playerEmail,
	dob: playerDOB,
	number: playerNumber,
	position: playerPosition,
	captain: playerCaptain,
	id: playerId

  });

  playerForm.reset();
  window.location.href = './rosterBootstrap.html';
}


/* 
 * 	fetches all the players and their data to the roster page
 */
function fetchRoster() {
	
	var rosterList = document.getElementById('rosterList');
	rosterList.innerHTML = '';

	db.collection("players").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			if (doc.data().firstName != null) {
				var number = doc.data().number;
				var name = doc.data().firstName + ' ' + doc.data().lastName;
				var email = doc.data().email;
				var age = getAge(doc.data().dob);
				var position = doc.data().position;


				rosterList.innerHTML += '<tr> <th scope="row">' + number + '</th>' +
										'<td>' + name + '</td>' +
										'<td>' + email.substring(0, email.indexOf('@')) + '<br>' + email.substring(email.indexOf('@'), email.length) + '</td>' +
										'<td>' + age + '</td>' +
										'<td>' + position + '</td>' +
										'<td><a href="editPlayerBootstrap.html" type="button" onclick="populatePlayerEdit(\''+ doc.data().id +'\')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
				  						'<td><input type="checkbox" name="players" id="\''+ doc.data().id +'\'"></td>' +
										'</tr>';

			}
		});
	});
		
} 


/* 
 * 	Gets all the players that had been checked to be deleted
 */
function deletePlayers() {
	console.log("in deletePlayers");
	var players = document.getElementsByName('players');

	for(let i=0; i < players.length; i++) {
		if(players[i].checked) {
			deletePlayerByKey(players[i].id);	
		}
	} 

	
}


/* 
 * 	Delete player from local storage that matches the id passed
 */
function deletePlayerByKey(id) {
//	var roster = JSON.parse(localStorage.getItem('roster'));


	db.collection("players").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			
			if (doc.data().firstName != null) {
				var str = id.substring(1, id.length - 1);
				
				if (doc.data().id == str) {
					db.collection("players").doc(str).delete().then(function() {
				
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});

				fetchRoster();
				}

			}
		});
	});
}


/* 
 * 	Finds and saves player to be edited to local storage
 */

 /*
function editPlayer(id) {	
	var roster = JSON.parse(localStorage.getItem('roster'));
	for (let i = 0; i < roster.length; i++) {
		if (roster[i].id === id) {
			localStorage.setItem('editPlayer', JSON.stringify(roster[i]));
			break;
		}
	}
}*/


/* 
 * 	Populates the edit page with the data of player selected
 */
function populatePlayerEdit(id) {
	//editThisPlayer = JSON.parse(localStorage.getItem('editPlayer'));	
	console.log("in populate player");
	console.log(id);

	console.log("hello");

	
	db.collection("players").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			console.log("in loop");
			if (doc.data().id == id) {

				console.log("Shit");
				var number = doc.data().number;
				var name = doc.data().firstName + ' ' + doc.data().lastName;
				var email = doc.data().email;
				var age = getAge(doc.data().dob);
				var position = doc.data().position;

				console.log(number);
				console.log(name);
				console.log(email);
				console.log(age);
				console.log(position);
		
			}
		});
	}); 
	


		


	



	
	/*

	document.getElementById('playerFNameEdit').value = editThisPlayer.firstName;
	document.getElementById('playerLNameEdit').value = editThisPlayer.lastName;
	document.getElementById('playerEmailEdit').value = editThisPlayer.email;
	document.getElementById('playerDobEdit').value = editThisPlayer.dob;
	document.getElementById('playerJerseyEdit').value = editThisPlayer.number;
	document.getElementById('playerPositionEdit').value = editThisPlayer.position;

	if(editThisPlayer.captain) {
		captainBoolean = true;
	} else {
		captainBoolean = false;
	}
	*/
}


/* 
 * 	Edits the player selected and replaces old data with new data. Then it saves to local storage
 */

 
function editPlayerCurr(e) {
	//Getting values from form
	var playerFirstName = document.getElementById('playerFNameEdit').value;
  	var playerLastName = document.getElementById('playerLNameEdit').value;
  	var playerEmail = document.getElementById('playerEmailEdit').value;
  	var playerDOB = document.getElementById('playerDobEdit').value;
  	var playerNumber = document.getElementById('playerJerseyEdit').value;
  	var playerPosition = document.getElementById('playerPositionEdit').value;
  	var playerCaptain = (document.getElementById('playerCaptainEdit').checked) ? true : false;
  	var playerId = playerFirstName + "|" + playerLastName + "|" + playerNumber;

	// Updating current entry
	var currPlayerId = editThisPlayer.id;
	var roster = JSON.parse(localStorage.getItem('roster'));
	for (let i = 0; i < roster.length; i++) {
		if (roster[i].id === currPlayerId) {
			roster[i].firstName = playerFirstName;
			roster[i].lastName = playerLastName;
			roster[i].email = playerEmail;
			roster[i].dob = playerDOB;
			roster[i].number = playerNumber;
			roster[i].position = playerPosition;
			roster[i].captain = playerCaptain;
			roster[i].id = playerId;
			break;
		}
	}
	
	localStorage.setItem('roster', JSON.stringify(roster));  

	//reseting form
	playerToEdit.reset();
	e.preventDefault();
	window.location.href = './rosterBootstrap.html';
}


/* 
 * 	Calculates the age of a player according to theri Date of Birth
 */
function getAge(dob) {
	var bornDate = new Date(dob).getTime() / 1000;
	var currDate = new Date().getTime() / 1000;
	var age = (currDate - bornDate) / 60 /  60 / 24 / 365;
	return Math.floor(age);
}


/* 
 * 	Checks if a player is Captain of the team
 */
function isCaptain() {
	return captainBoolean;
}


