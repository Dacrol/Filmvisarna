import App from './app.class.js';

class Salon extends App {
	constructor(){
		super();
		// Vilka parametrar behöver Salon-klassen?
	}

	async renderSeats(){
		let salonSeats = await JSON._load('salong.json');

		// Första for-loopen skriver ut antalet rader i salongen (baserat på length)
		for(let i = 0; i < salonSeats[0].seatsPerRow.length; i++){
			let row = $('<div>');
			// Andra for-loopen skriver ut sätena i respektive rad (adderar CSS-klassen 'seat')
		  for(let j = 0; j < salonSeats[0].seatsPerRow[i]; j++){
				let col = $('<div>').addClass('seat');
				$(row).append(col);
				}
			$('.salon-container').append(row);
		}
	}
}

export default Salon;