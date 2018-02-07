class Salon {
	constructor(){

	}

	renderSeats(){
		JSON._load('salong.json').then(function(seats){
			for(let seat of seats){
			  let row = $('<div>');
			  for(let i = 0; i < 8; i++){
			    let seats = $('<div>').addClass('seat');
			    row.append(seats);
			  }
			  $('.salon-container').append(row);
				}
			}
		}
	}
}