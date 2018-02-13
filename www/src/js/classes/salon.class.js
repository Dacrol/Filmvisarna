import Base from './base.class.js';

class Salon extends Base {
  constructor (salongNr) {
    super();
    // Vilka properties behöver Salon-klassen?
    this.salongNr = salongNr;
    this.salonSeats = [];
    $(window).on('resize', () => this.scale());
    this.scale();
    $(window)
      .on('resize', function () {
        let saloonHeight = $('.salon-wrapper').outerHeight();
        console.log(saloonHeight);

        $('button.booking').css('margin-top', saloonHeight + 20);
      })
      .trigger('resize');
  }

  scale () {
    let salonContainerWidth = 1080;
    let salonContainerHeight = 480;

    let w = $(window).width();
    let h = $(window).height();
    w -= 100 * 2;
    h -= 50 * 2;

    let wScale = w / salonContainerWidth; // wScale = 1,1851851
    let hScale = h / salonContainerHeight; // hScale = 1,2729166
    let scaling = Math.min(wScale, hScale); // scaling = 1,185
    $('.salon-container')
      .css('transform', `scale(${scaling})`)
      .show();
    $('.salon-wrapper').width(salonContainerWidth * scaling);
    $('.salon-wrapper').height(salonContainerHeight * scaling);
  }

  // Parametern hos renderSeats() ska antingen vara 0 för Stora salongen eller 1 för Lilla salongen (se salong.json)
  // Just nu ges parametern värdet 0 när metoden anropas i view-setup.js
  // Detta måste ändras senare då man istället ska anropa salon.renderSeats() beroende på vilken salong filmen man vill se går i
  async renderSeats (salongNr = undefined) {
    // Make sure this.salongNr matches the rendered salon for later use
    if (typeof salongNr !== 'number') {
      salongNr = this.salongNr;
    } else {
      this.salongNr = salongNr;
    }

    let allSalons = await JSON._load('salong.json');
    this.salonSeats = allSalons[salongNr].seatsPerRow; // Save for later use in hover function

    let seatNr = 0;
    // Första for-loopen skriver ut antalet rader i salongen (baserat på length)
    for (let i = 0; i < allSalons[salongNr].seatsPerRow.length; i++) {
      let row = $('<div>');
      // Andra for-loopen skriver ut sätena i respektive rad (adderar CSS-klassen 'seat')
      for (let j = allSalons[salongNr].seatsPerRow[i]; j > 0; j--) {
        // Varje individuellt säte får en unik koordinat med attributen data-rownumber och data-seatnumber i sitt element
        // Dessa kan inspekteras i DOM:et
        seatNr++;
        let col = $('<div>')
          .addClass('seat')
          .attr('data-rownumber', i + 1)
          .attr('data-seatnumber', seatNr);
        $(row).prepend(col);
      }
      $('.salon-container').append(row);
    }

    this.setAmountOfSeats();
  }

  setAmountOfSeats () {
    let that = this;
    $('#number-of-visitors')
      .on('change', function () {
        let seats = $(this).val();
        if (typeof seats === 'string') that.refreshSeatEvents(parseInt(seats));
      })
      .trigger('change');
  }

  refreshSeatEvents (seats = 1) {
    let that = this;
    // console.log(seats);
    $('.seat').off('mouseenter mouseleave');

    $('.seat').each(function () {
      let row = $(this).attr('data-rownumber');
      let seat = $(this).attr('data-seatnumber');
      // console.log(row, seat);
      let seatNumbers = that.getAdjacent(+seat, seats, that.salonSeats, +row);
      let targetSeats = $(this)
        .siblings()
        .addBack()
        .filter(function () {
          let seat = $(this).attr('data-seatnumber');
          return seatNumbers.includes(+seat);
        });
      $(this)
        .hover(
          function () {
            targetSeats.addClass('hovered');
          },
          function () {
            targetSeats.removeClass('hovered');
          }
        )
        .click(function () {
          $('.seat').removeClass('selected');
          targetSeats.addClass('selected');
        });
    });
  }

  // kunna returnera hur många platser i salongen som en visning har

  /**
   * Gets adjacent seats
   *
   * @param {number} start the seat number to start from
   * @param {number} amount total amount of desired seats
   * @param {Array.<number>} seatsPerRow array with seats per row
   * @param {number} row current row. 1-indexed.
   * @returns {Array.<number>} selected seats
   * @memberof Salon
   */
  getAdjacent (start, amount, seatsPerRow, row) {
    let seatNumbers = [];
    row -= 1;
    const max = seatsPerRow.reduce((acc, seats, index) => {
      return index <= row ? acc + seats : acc;
    });
    const min = max - seatsPerRow[row] + 1;
    for (let count = 0; count <= (amount - 1) * 2; count++) {
      let offset = count % 2 !== 0 ? (count + 1) / 2 : -(count / 2);
      let seat = start + offset;
      if (!(seat > max || seat < min)) {
        seatNumbers.push(seat);
        if (seatNumbers.length === amount) {
          return seatNumbers.sort((a, b) => {
            return a - b;
          });
        }
      }
    }
    return [];
  }
}

export default Salon;
