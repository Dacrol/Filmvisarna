import App from './app.class.js';

class Salon extends App {
	constructor(){
		super();
		// Vilka properties behöver Salon-klassen?
	}

	// TODO: Lägg till parameter i renderSeats-metoden som väljer Stora eller Lilla salongen (just nu renderas bara Stora salongen (salonSeats[0]) ut)
	async renderSeats(){
		let salonSeats = await JSON._load('salong.json');

		let seatNr = 0;
		// Första for-loopen skriver ut antalet rader i salongen (baserat på length)
		for(let i = 0; i < salonSeats[0].seatsPerRow.length; i++){
			let row = $('<div>');
			// Andra for-loopen skriver ut sätena i respektive rad (adderar CSS-klassen 'seat')
		  for(let j = salonSeats[0].seatsPerRow[i]; j > 0; j--){
		  	// Varje individuellt säte får en unik koordinat med attributen data-rownumber och data-seatnumber i sitt element
		  	// Dessa kan inspekteras i DOM:et
		  	seatNr++;
				let col = $('<div>').addClass('seat').attr('data-rownumber', (i + 1)).attr('data-seatnumber', seatNr);
				$(row).prepend(col);
				}
			$('.salon-container').append(row);
		}
		this.selectSeat();
	}

	selectSeat(){
		$('.seat').on('click', function(){
			$(this).addClass('selected');
			console.log("selected");
		});
	}
}

export default Salon;