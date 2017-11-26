// Function that saves the game to local storage
function saveGame(e) {
	var currOponent = document.getElementById('oponent').value;
	var currLocation = document.getElementById('location').value;
	var currDate = document.getElementById('date').value;
	var currStatus = document.getElementsByName('status');
	var currStatusValue;
	for(let i=0; i < currStatus.length; i++) {
		if(currStatus[i].checked) {
			currStatusValue = currStatus[i].value;
		}
	}

	var game = { oponent: currOponent,
				 location: currLocation,
				 date: currDate,
				 status: currStatusValue };
	console.log(currDate);

	if(localStorage.getItem('schedule') === null) {
		var schedule = [];
		schedule.push(game);
		localStorage.setItem('schedule', JSON.stringify(schedule));
	} else {
		var schedule = JSON.parse(localStorage.getItem('schedule'));
		schedule.push(game);
		localStorage.setItem('schedule', JSON.stringify(schedule));
	}

	// gameToAdd.reset();
}