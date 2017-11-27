

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


/* 
 * 	Adds a new player to the roster and saves it in local storage
 */
function savePlayer(e) {

  var playerFirstName = document.getElementById('playerFName').value;
  var playerLastName = document.getElementById('playerLName').value;
  var playerEmail = document.getElementById('playerEmail').value;
  var playerDOB = document.getElementById('playerDOB').value;
  var playerNumber = document.getElementById('playerJersey').value;
  var playerPosition = document.getElementById('playerPosition').value;
  var playerCaptain = (document.getElementById('playerCaptain').checked) ? true : false;
  var playerId = playerFirstName + "|" + playerLastName + "|" + playerNumber;
  // var playerPicture;
  
  var player = { firstName: playerFirstName,
  				 lastName: playerLastName,
  				 email: playerEmail,
  				 dob: playerDOB,
  				 number: playerNumber,
  				 position: playerPosition,
  				 captain: playerCaptain,
  				 id: playerId }

  if (localStorage.getItem('roster') == null) {
    var roster = [];
    roster.push(player);
    localStorage.setItem('roster', JSON.stringify(roster));
  } 
  else {
    var roster = JSON.parse(localStorage.getItem('roster'));
    roster.push(player);
    localStorage.setItem('roster', JSON.stringify(roster));
  }
  
  playerForm.reset();
  window.location.href = './rosterBootstrap.html';
}


/* 
 * 	fetches all the players and their data to the roster page
 */
function fetchRoster() {
	
	var roster = JSON.parse(localStorage.getItem('roster'));
	var rosterList = document.getElementById('rosterList');

	rosterList.innerHTML = '';

	if (roster != null) {
		for (let i = 0; i < roster.length; i++) {
			var number = roster[i].number;
			var name = roster[i].firstName + ' ' + roster[i].lastName;
			var email = roster[i].email;
			var age = getAge(roster[i].dob);
			var position = roster[i].position;

			// I had to parition the email in this format so it will fit on small screens without throwing the layour off
			rosterList.innerHTML += '<tr> <th scope="row">' + number + '</th>' +
									'<td>' + name + '</td>' +
									'<td>' + email.substring(0, email.indexOf('@')) + '<br>' + email.substring(email.indexOf('@'), email.length) + '</td>' +
									'<td>' + age + '</td>' +
									'<td>' + position + '</td>' +
									'<td><a href="editplayerBootstrap.html" type="button" onclick="editPlayer(\''+ roster[i].id +'\')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
				      				'<td><input type="checkbox" name="players" id="\''+ roster[i].id +'\'"></td>' +
									'</tr>'; 
		}
	}	
} 


/* 
 * 	Gets all the players that had been checked to be deleted
 */
function deletePlayers() {
	var players = document.getElementsByName('players');

	for(let i=0; i < players.length; i++) {
		if(players[i].checked) {
			deletePlayerByKey(players[i].id);	
		}
	} 

	fetchRoster();
}


/* 
 * 	Delete player from local storage that matches the id passed
 */
function deletePlayerByKey(id) {
	var roster = JSON.parse(localStorage.getItem('roster'));
  
	for (let i = 0; i < roster.length; i++) {
		var str = id.substring(1, id.length - 1);
		if (roster[i].id === str) {
			roster.splice(i,1);
			break;
		}
	}
  
	localStorage.setItem('roster', JSON.stringify(roster));  
}


/* 
 * 	Finds and saves player to be edited to local storage
 */
function editPlayer(id) {	
	var roster = JSON.parse(localStorage.getItem('roster'));
	for (let i = 0; i < roster.length; i++) {
		if (roster[i].id === id) {
			localStorage.setItem('editPlayer', JSON.stringify(roster[i]));
			break;
		}
	}
}


/* 
 * 	Populates the edit page with the data of player selected
 */
function populatePlayerEdit() {
	editThisPlayer = JSON.parse(localStorage.getItem('editPlayer'));	

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


