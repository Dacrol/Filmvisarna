class Salon {
	constructor(){

	}

	renderSeats(){
		JSON._load('salong.json');

		for(let i = 0; i < {{:salons[0].seatsPerRow.length}}; i++){
		  for(let j = 0; j < {{:salons[0].seatsPerRow[i]}}; j++){
				let row = $('<div>');
				for(let k = 0; k < {{:salons[0].seatsPerRow[j]}}; k++){
					let col = $('<div>').addClass('seat');
					$(row).append(col);
				}
				$('.salon-container').append(row);
			}
		}
	}
}