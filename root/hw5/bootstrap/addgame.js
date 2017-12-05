/**
 * JavaScript to add game to local storage
 */


// Global variables to get forms from new and updated games
var gameToAdd = document.getElementById('gameForm');
var gameToEdit = document.getElementById('editGameForm');
var editThisGame = {};
homeBoolean = false;
awayBoolean = false;

if(gameToAdd !== null) {
	gameToAdd.addEventListener('submit', saveGame, false);
}

if(gameToEdit !== null) {
		gameToEdit.addEventListener('submit', editGameCurr, false);
}


/* 
 * Function that saves a new game to the local storage
 */
function saveGame(e) {
	//Getting values from form
	var currOponent = document.getElementById('oponent').value;
	var currLocation = document.getElementById('location').value;
	var currDate = document.getElementById('date').value;
	var gameId = currOponent + '|' + currDate;
	var currStatus = document.getElementsByName('status');
	var currStatusValue;
	for(let i=0; i < currStatus.length; i++) {
		if(currStatus[i].checked) {
			currStatusValue = currStatus[i].value;
		}
	}

	//Creating object to store in local storage
	var game = { oponent: currOponent,
				 location: currLocation,
				 date: currDate,
				 status: currStatusValue, 
				 id: gameId 
				};

	//Storing in local storage
	if(localStorage.getItem('schedule') === null) {
		var schedule = [];
		schedule.push(game);
		localStorage.setItem('schedule', JSON.stringify(schedule));
	} else {
		var schedule = JSON.parse(localStorage.getItem('schedule'));
		schedule.push(game);
		localStorage.setItem('schedule', JSON.stringify(schedule));
	}

	//reseting form
	gameToAdd.reset();
	e.preventDefault();
	window.location.href = './scheduleBootstrap.html';
}



/* 
 * Fetches the current saved games to the schedule page on loading 
 */
function fetchSchedule() {

	// Getting objects from local storage
	var schedule = JSON.parse(localStorage.getItem('schedule'));
	var scheduleTable = document.getElementById('scheduleTable');
	var ourTeam = 'Our Team';
	scheduleTable.innerHTML = '';

	// Populating table
	if (schedule != null) {
		for (let i = 0; i < schedule.length; i++) {
			// var id = roster[i].id;
			var oponent = schedule[i].oponent;
			var location = schedule[i].location;
			var status = schedule[i].status;
			var date = schedule[i].date;

			scheduleTable.innerHTML += 	'<tr><th scope="row"><time datetime="' + date + '">' + date + '</time></th>' +
				      						'<td>' + ourTeam + '<br> vs <br>' + oponent + '</td>' +
				      						'<td>' + location + '</td>' +
				      						'<td>' + status + '</td>' +
				      						'<td><a href="editgameBootstrap.html" type="button" onclick="editGame(\''+ schedule[i].id +'\')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
				      						'<td><input type="checkbox" name="games" id="\''+ schedule[i].id +'\'"></td>' +
				    					'</tr>';
		}
	}
}


/* 
 * 	Gets all selected games from checkboxes and calls a function to delete them by id
 */
function deleteGames() {
	var games = document.getElementsByName('games');

	for(let i=0; i < games.length; i++) {
		if(games[i].checked) {
			deleteItemByKey(games[i].id);	
		}
	} 

	fetchSchedule();
}


/* 
 * 	Deletes a games by id
 */
function deleteItemByKey(id) {
	var schedule = JSON.parse(localStorage.getItem('schedule'));
  
	for (let i = 0; i < schedule.length; i++) {
		var str = id.substring(1, id.length - 1);
		if (schedule[i].id === str) {
			schedule.splice(i,1);
			break;
		}
	}
  
	localStorage.setItem('schedule', JSON.stringify(schedule));  
}


/* 
 * 	Gets the game to be edited and saves it to local storage
 */
function editGame(id) {
	var schedule = JSON.parse(localStorage.getItem('schedule'));
	for (let i = 0; i < schedule.length; i++) {
		if (schedule[i].id === id) {
			localStorage.setItem('editGame', JSON.stringify(schedule[i]));
			break;
		}
	}
}


/* 
 *	Populates the edit page with the data of the game to be edited 
 */
function populateEdit() {
	editThisGame = JSON.parse(localStorage.getItem('editGame'));	

	document.getElementById('oponentEdit').value = editThisGame.oponent;
	document.getElementById('locationEdit').value = editThisGame.location;
	document.getElementById('dateEdit').value = editThisGame.date;

	if(editThisGame.status === 'home') {
		homeBoolean = true;
		awayBoolean = false;
	} else {
		homeBoolean = false;
		awayBoolean = true;
	}
}


/* 
 * 	function that actually edits the editGame(selected game to be edited) from local storage.
 */
function editGameCurr(e) {
	//Getting values from form
	var currOponent = document.getElementById('oponentEdit').value;
	var currLocation = document.getElementById('locationEdit').value;
	var currDate = document.getElementById('dateEdit').value;
	var gameId = currOponent + '|' + currDate;
	var currStatus = document.getElementsByName('statusEdit');
	var currStatusValue;
	for(let i=0; i < currStatus.length; i++) {
		if(currStatus[i].checked) {
			currStatusValue = currStatus[i].value;
		}
	}

	// Updating current entry
	var currId = editThisGame.id;
	var schedule = JSON.parse(localStorage.getItem('schedule'));
	for (let i = 0; i < schedule.length; i++) {
		if (schedule[i].id === currId) {
			schedule[i].oponent = currOponent;
			schedule[i].location = currLocation;
			schedule[i].date = currDate;
			schedule[i].status = currStatusValue;
			schedule[i].id = currOponent + '|' + currDate;
			break;
		}
	}
	
	localStorage.setItem('schedule', JSON.stringify(schedule));  

	//reseting form
	gameToEdit.reset();
	e.preventDefault();
	window.location.href = './scheduleBootstrap.html';
}



