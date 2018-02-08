import App from './app.class.js';

class Salon extends App {
	constructor(){
		super();
		// Vilka properties behöver Salon-klassen?
    $(window).on('resize', () => this.scale());
    this.scale();
	}

  scale(){
    let salonContainerWidth = 1080;
    let salonContainerHeight = 480;
    
    let w = $(window).width();
    let h = $(window).height();
    w -= 10 * 2;
    h -= 10 * 2;

    let wScale = w / salonContainerWidth; 
    let hScale = h / salonContainerHeight;
    let scaling = Math.min(wScale, hScale);
    $('.salon-container').css('transform', `scale(${scaling})`).show();
    $('.salon-container').width(salonContainerWidth * scaling).height(salonContainerHeight * scaling);
  }

  // Parametern hos renderSeats() ska antingen vara 0 för Stora salongen eller 1 för Lilla salongen (se salong.json)
  // Just nu ges parametern värdet 0 när metoden anropas i view-setup.js
  // Detta måste ändras senare då man istället ska anropa salon.renderSeats() beroende på vilken salong filmen man vill se går i
	async renderSeats(salongNr){
		let salonSeats = await JSON._load('salong.json');

		let seatNr = 0;
		// Första for-loopen skriver ut antalet rader i salongen (baserat på length)
		for(let i = 0; i < salonSeats[salongNr].seatsPerRow.length; i++){
			let row = $('<div>');
			// Andra for-loopen skriver ut sätena i respektive rad (adderar CSS-klassen 'seat')
		  for(let j = salonSeats[salongNr].seatsPerRow[i]; j > 0; j--){
		  	// Varje individuellt säte får en unik koordinat med attributen data-rownumber och data-seatnumber i sitt element
		  	// Dessa kan inspekteras i DOM:et
		  	seatNr++;
				let col = $('<div>').addClass('seat').attr('data-rownumber', (i + 1)).attr('data-seatnumber', seatNr);
				$(row).prepend(col);
				}
			$('.salon-container').append(row);
		}
		this.hoverSeat();
		this.selectSeat();
	}

	hoverSeat(){
		$('.seat').on('mouseover', function(){
			$(this).addClass('hovered');
		});

		$('.seat').on('mouseleave', function(){
			$(this).removeClass('hovered');
		});
	}

	selectSeat(){
		$('.seat').on('click', function(){
			$('.salon-container div').removeClass('selected');
			$(this).addClass('selected');
		});
	}
}

export default Salon;