/**
 * JavaScript to add game to local storage
 */

 var config = {
  apiKey: "AIzaSyBHPFZ_lh_iNcTNJSgZlbEku1DQdNnJ-mg",
  authDomain: "hw2-cse134b-3ffd9.firebaseapp.com",
  databaseURL: "https://hw2-cse134b-3ffd9.firebaseio.com",
  projectId: "hw2-cse134b-3ffd9",
  storageBucket: "hw2-cse134b-3ffd9.appspot.com",
  messagingSenderId: "525755574970"
};
firebase.initializeApp(config);

var db = firebase.firestore();


// Global variables to get forms from new and updated games
var gameToAdd = document.getElementById('gameForm');
var gameToEdit = document.getElementById('editGameForm');
var editThisGame = {};
var homeBoolean = false;
var awayBoolean = false;
// var db;

if(gameToAdd !== null) {
	gameToAdd.addEventListener('submit', saveGame, false);

	db.collection('games').doc('null').set({
   		oponent: '',
   		location: '',
   		date: '',
  		status: '',
   		id: '',
	});

	db.collection('games').doc('null').delete().then(function() {
    	console.log('Document successfully deleted!');
	}).catch(function(error) {
    	console.error('Error removing document: ', error);
	});
}

if(gameToEdit !== null) {
		gameToEdit.addEventListener('submit', editGameCurr, false);

		db.collection('games').doc('null').set({
   		oponent: '',
   		location: '',
   		date: '',
  		status: '',
   		id: '',
	});

	db.collection('games').doc('null').delete().then(function() {
    	console.log('Document successfully deleted!');
	}).catch(function(error) {
    	console.error('Error removing document: ', error);
	});
}

//Getting values from form
	var currOponent;
	var currLocation;
	var currDate;
	var gameId;
	var currStatus;
	var currStatusValue;

/* 
 * Function that saves a new game to the local storage
 */
function saveGame(e) {

	currOponent = document.getElementById('oponent').value;
	currLocation = document.getElementById('location').value;
	currDate = document.getElementById('date').value;
	gameId = currOponent + '|' + currDate;
	currStatus = document.getElementsByName('status');
	for(let i=0; i < currStatus.length; i++) {
		if(currStatus[i].checked) {
			currStatusValue = currStatus[i].value;
		}
	}

	var game = {
		oponent: currOponent,
		location: currLocation,
		date: currDate,
		status: currStatusValue,
		id: gameId
	};

	//Creating object to store in database
	db.collection('games').doc(gameId).set(game).then(function() {
		console.log('Success');
	}).catch(function(error) {
		console.error(error);
	});

	//reseting form
	gameToAdd.reset();
	e.preventDefault();
	window.location.href = './scheduleBootstrap.html';
}



/* 
 * Fetches the current saved games to the schedule page on loading 
 */
function fetchSchedule() {

	var scheduleTable = document.getElementById('scheduleTable');
	var ourTeam = 'Our Team';
	var gamesRef = db.collection("games");
	scheduleTable.innerHTML = '';

	gamesRef.orderBy("date").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var oponent = doc.data().oponent;
			var location = doc.data().location;
			var status = doc.data().status;
			var date = doc.data().date;

			scheduleTable.innerHTML += 	'<tr><th scope="row"><time datetime="' + date + '">' + date + '</time></th>' +
				      						'<td>' + ourTeam + '<br> vs <br>' + oponent + '</td>' +
				      						'<td>' + location + '</td>' +
				      						'<td>' + status + '</td>' +
				      						'<td><a href="editgameBootstrap.html" type="button" onclick="editGame(\''+ doc.data().id +'\')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
				      						'<td><input type="checkbox" name="games" id="\''+ doc.data().id +'\'"></td>' +
				    					'</tr>';
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
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

	setTimeout( function(){fetchSchedule();} , 1000 );
}


/* 
 * 	Deletes a games by id
 */
function deleteItemByKey(id) {

	db.collection("games").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var str = id.substring(1, id.length - 1);
			if (doc.data().id === str) {
				db.collection("games").doc(doc.data().id).delete().then(function() {
				    console.log("Document successfully deleted!");
				}).catch(function(error) {
				    console.error("Error removing document: ", error);
				});
			}
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
}


/* 
 * 	Gets the game to be edited and saves it to local storage
 */
function editGame(id) {	
	localStorage.setItem('editGameID', id);
}

/* 
 *	Populates the edit page with the data of the game to be edited 
 */
function populateEdit() {

	var docRef = db.collection("games").doc(localStorage.getItem('editGameID'));

	docRef.get().then(function(doc) {
		if (doc.exists) {
			console.log("doc data: ", doc.data());
			document.getElementById('oponentEdit').value = doc.data().oponent;
			document.getElementById('locationEdit').value = doc.data().location;
			document.getElementById('dateEdit').value = doc.data().date;

			if(doc.data().status === 'home') {
				homeBoolean = true;
				awayBoolean = false;
			} else {
				homeBoolean = false;
				awayBoolean = true;
			}
		} else {
			console.log("None");
		}
	}).catch(function(error) {
		console.log(error);
	});
}


/* 
 * 	function that actually edits the editGame(selected game to be edited) from local storage.
 */
function editGameCurr(e) {
	//Getting values from form
	currOponent = document.getElementById('oponentEdit').value;
	currLocation = document.getElementById('locationEdit').value;
	currDate = document.getElementById('dateEdit').value;
	gameId = currOponent + '|' + currDate;
	currStatus = document.getElementsByName('statusEdit');
	currStatusValue;
	for(let i=0; i < currStatus.length; i++) {
		if(currStatus[i].checked) {
			currStatusValue = currStatus[i].value;
		}
	}

	// Updating current entry
	var game = {
		oponent: currOponent,
		location: currLocation,
		date: currDate,
		status: currStatusValue,
		id: gameId
	};

	//Creating object to store in database
	db.collection('games').doc(gameId).set(game).then(function() {
		console.log('Success');
	}).catch(function(error) {
		console.error(error);
	});

	//deleting object
	db.collection('games').doc(localStorage.getItem('editGameID')).delete().then(function() {
    	console.log('Document successfully deleted!');
	}).catch(function(error) {
    	console.error('Error removing document: ', error);
	});


	//reseting form
	gameToEdit.reset();
	e.preventDefault();
	window.location.href = './scheduleBootstrap.html';
}

// function setDB(app) {
// 	db = app;
// }



