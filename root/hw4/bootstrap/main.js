//document.getElementById('addPlayerForm').addEventListener('submit', savePlayer);


var el = document.getElementById('addPlayerForm');
if(el != null){
  el.addEventListener('submit', savePlayer);
}

var e2 = document.getElementById('editPlayerForm');
if (e2 != null) {
	e2.addEventListener('submit', editPlayer);
}

function onCancel () {
	var tmpId = JSON.parse(localStorage.getItem('tmpId'));
	tmpId.splice(0, 1);
	localStorage.setItem('tmpId', JSON.stringify(tmpId));
}
function storeId (id) {
	console.log("in storeId "+id);
	var editId = {tmp: id};

	if (localStorage.getItem('tmpId') == null) {
		var tmpId = [];
		tmpId.push(editId);
		localStorage.setItem('tmpId', JSON.stringify(tmpId));
	} else {
		var tmpId = JSON.parse(localStorage.getItem('tmpId'));
		tmpId.push(editId);
		localStorage.setItem('tmpId', JSON.stringify(tmpId));
	}

	console.log("in storeId "+id);
}

function savePlayer(e) {
  console.log("hello in saveplayer");
  var playerName = document.getElementById('nameInput').value;
  var playerEmail = document.getElementById('emailInput').value;
  var playerAge = document.getElementById('ageInput').value;
  var playerNumber = document.getElementById('jerseyInput').value;
  var playerPosition = document.getElementById('positionInput').value;
  // random Id generator
  var playerId = chance.guid();
  
  var player = {
	id: playerId,
    name: playerName,
    email: playerEmail,
    age: playerAge,
    number: playerNumber,
    position: playerPosition
  }
  console.log(playerId);
  console.log(playerName);
  console.log(playerEmail);
  console.log(playerAge);
  console.log(playerNumber);

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
  document.getElementById('addPlayerForm').reset();

  //window.location.replace("http://stackoverflow.com");
  window.location.href = '/rosterBootstrap.html';

  //e.preventDefault();
}
function renderEditForm() {
	console.log("in edit render");
	var roster = JSON.parse(localStorage.getItem('roster'));
	var editPlayerForm = document.getElementById('editPlayerForm');
	var tmpId = JSON.parse(localStorage.getItem('tmpId'));

	editPlayerForm.innerHTML = '';
	for (var i = 0; i < roster.length; i++) {
		console.log("roster[i]" + roster[i].id);
		console.log("tmpId[0]" + tmpId[0].tmp);

		if (roster[i].id == tmpId[0].tmp) {
			console.log("true");
			//tmpId.splice(0, 1);
		  	var name = roster[i].name;
		  	var email = roster[i].email;
		  	var age = roster[i].age;
		  	var number = roster[i].number;
			var position = roster[i].position;
			break;		  
		}
	}

	console.log(name);
	console.log(email);
	console.log(age);
	console.log(number);
	console.log(position);

	editPlayerForm.innerHTML +=	'<div class="form-group">' +
							'<label for="name">Name</label>' +
							'<input type="text" class="form-control" id="nameEdit" value="' + name + '"' +
							'</div>' +
							'<div class="form-group">' +
							'<label for="email">Email Address</label>' +
							'<input type="text" class="form-control" id="emailEdit" value="' + email + '"' +
							'</div>' +
							'<div class="form-group">' +
							'<label for="date">Age</label>' +
							'<input type="text" class="form-control" id="ageEdit" value="' + age + '"' +
							'</div>' +
							'<div class="form-group">' +
							'<label for="jersey">Jeresey # </label>' +
							'<input type="text" class="form-control" id="jerseyEdit" value="' + number + '"' +
							'</div>' + 
							'<div class ="form-group dropdown"> <label for="positionInput">Position</label>' +
							'<select id="positionEdit" class="form-control">' +
							'<option selected="selected">'+ position + '</option>' +
							'<option value="GoalKeeper">GoalKeeper</option>' +
							'<option value="Defense">Defense</option>' +
							'<option value="MidField">MidField</option>' +
							'option value="Forward">Forward</option>' +
							'</select>'+
							'</div>' +
							'<br>' +
							'<button type="submit" class="btn btn-success"> Update </button>' +
							'<a class="btn btn-danger" type="button" value="Cancel" href="./rosterBootstrap.html" onclick="onCancel()">Cancel</a>'+
							'</form>';

}
function fetchRoster() {
	console.log("hello in fetch");
	var roster = JSON.parse(localStorage.getItem('roster'));
	var rosterList = document.getElementById('rosterList');

	rosterList.innerHTML = '';

	if (roster != null) {
		for (var i = 0; i < roster.length; i++) {
			var id = roster[i].id;
			console.log(id);
			var number = roster[i].number;
			var name = roster[i].name;
			var email = roster[i].email;
			var age = roster[i].age;
			var position = roster[i].position;

			rosterList.innerHTML += '<tr> <th scope="row">' + number + '</th>' +
									'<td>' + name + '</td>' +
									'<td>' + email + '</td>' +
									'<td>' + age + '</td>' +
									'<td>' + position + '</td>' +
								
									'<td> <a href="editplayerBootstrap.html" onclick="storeId(\''+id+'\')" class="btn btn-success">Edit</a> </td>'+
									'<td> <a href="#" onclick="deletePlayer(\''+id+'\')" class="btn btn-danger">Delete</a> </td>'+
									'</tr>'; 
		}
	}
	
} // end of fetch roster

function deletePlayer(id) {
	var roster = JSON.parse(localStorage.getItem('roster'));
  
	for (var i = 0; i < roster.length; i++) {
	  if (roster[i].id == id) {
		roster.splice(i, 1);
	  }
	}
  
	localStorage.setItem('roster', JSON.stringify(roster));
  
	fetchRoster();
  }


function editPlayer(e) {
	 console.log("in edit");
	var roster = JSON.parse(localStorage.getItem('roster'));
	var tmpId = JSON.parse(localStorage.getItem('tmpId'));

	var playerName = document.getElementById('nameEdit').value;
	var playerEmail = document.getElementById('emailEdit').value;
	var playerAge = document.getElementById('ageEdit').value;
	var playerNumber = document.getElementById('jerseyEdit').value;
	var playerPosition = document.getElementById('positionEdit').value;

	console.log(playerName);
	console.log(playerEmail);
	console.log(playerAge);
	console.log(playerNumber);

	var roster = JSON.parse(localStorage.getItem('roster'));
	var tmpId = JSON.parse(localStorage.getItem('tmpId'));

	//console.log("rosterid: "+ roster[0].id);
	//console.log("tmp id : " + tmpId[0].tmp);

	for (var i = 0; i < roster.length; i++) {
		console.log("roster[i]" + roster[i].id);
		console.log("tmpId[0]" + tmpId[0].tmp);

		if (roster[i].id == tmpId[0].tmp) {
			console.log("true");
			tmpId.splice(0, 1);
		  	roster[i].name = playerName;
		  	roster[i].email = playerEmail;
		  	roster[i].age = playerAge;
		  	roster[i].number = playerNumber;
			roster[i].position = playerPosition;
			break;
			  
		}
	}

	localStorage.setItem('tmpId', JSON.stringify(tmpId));
	localStorage.setItem('roster', JSON.stringify(roster));


}
