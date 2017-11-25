//document.getElementById('addPlayerForm').addEventListener('submit', savePlayer);

var el = document.getElementById('addPlayerForm');
if(el != null){
  el.addEventListener('submit', savePlayer);
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
  } else {
    var roster = JSON.parse(localStorage.getItem('roster'));
    roster.push(player);
    localStorage.setItem('roster', JSON.stringify(roster));
  }

  document.getElementById('addPlayerForm').reset();

  //fetchRoster();

  e.preventDefault();
}

function fetchRoster() {
	console.log("hello in fetch");
	var roster = JSON.parse(localStorage.getItem('roster'));
	var rosterList = document.getElementById('rosterList');

	rosterList.innerHTML = '';

	if (roster != null) {
		for (var i = 0; i < roster.length; i++) {
			var id = roster[i].id;
			var number = roster[i].number;
			var name = roster[i].name;
			var email = roster[i].email;
			var age = roster[i].age;
			var position = roster[i].position;

			/*
			rosterList.innerHTML += '<div class="well">'+
			'<h6>Player number: ' + number + '</h6>'+
			'<p><span class="label label-info">' + name + '</span></p>'+
			'<h3>' + email + '</h3>'+
			'<p><span class="glyphicon glyphicon-time"></span> ' + dob + '</p>'+
			'<p><span class="glyphicon glyphicon-user"></span> ' + position + '</p>'+
			'<a href="#" onclick="deletePlayer(\''+id+'\')" class="btn btn-danger">Delete</a>'+
			'</div>'; */


			rosterList.innerHTML += '<tr> <th scope="row">' + number + '</th>' +
									'<td>' + name + '</td>' +
									'<td>' + email + '</td>' +
									'<td>' + age + '</td>' +
									'<td>' + position + '</td>' +
									'<td> Edit </td>' +
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



