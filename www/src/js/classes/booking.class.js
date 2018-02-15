export default class Booking {
  constructor (screening, app) {
    this.screening = screening;
    this.user = app.logInHandler.currentUser;
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
    return JSON._save('bookings.json', bookings);
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
