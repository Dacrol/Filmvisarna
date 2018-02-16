export default class Booking {
  constructor (screening) {
    this.screening = screening;
    this.user = null;
    this.seats = [];
    this.ticketTypes = {};
    this.confirmationNumber = undefined;
  }

  get price () {
    return (
      this.ticketTypes.adults * 85 +
      this.ticketTypes.seniors * 75 +
      this.ticketTypes.juniors * 65
    );
  }

  async save (allBookings = null) {
    let bookings =
      allBookings || (await JSON._load('bookings.json').catch(() => []));
    if (
      !this.confirmationNumber ||
      bookings.some(
        (booking) => booking.confirmationNumber === this.confirmationNumber
      )
    ) {
      this.confirmationNumber = Booking.randomBookNumber();
      return this.save(bookings);
    }
    bookings.push(this);
    await JSON._save('bookings.json', bookings);
    return this.confirmationNumber;
  }

  static async fetch (number) {
    if (typeof number !== 'string') {
      number = '' + number;
    }
    let allBookings = await JSON._load('bookings.json').catch(() => []);
    let booking = allBookings.find(
      (booking) => booking.confirmationNumber === number
    );
    if (booking) {
      return booking;
    } else {
      throw new Error('Invalid confirmation number');
    }
  }

  static async getOccupied (screening) {
    let allBookings = await JSON._load('bookings.json').catch(() => []);
    let matching = allBookings.filter((booking) => {
      return Object.entries(screening).every((entry) => booking.screening[entry[0]] === entry[1]);
    });
    return [].concat(...matching.map((match) => match.seats));
  }

  static randomBookNumber () {
    let text = '';
    let randomCode = '0123456789';

    for (let i = 0; i < 12; i++) {
      text += randomCode.charAt(Math.floor(Math.random() * randomCode.length));
    }
    return text;
  }
}

// @ts-ignore
window.Booking = Booking;
