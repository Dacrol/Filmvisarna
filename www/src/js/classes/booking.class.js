export default class Booking {
  constructor (screening, app) {
    this.screening = screening;
    this.user = app.logInHandler.currentUser;
    this.seats = [];
    this.ticketTypes = {};
  }

  get price () {
    return (this.ticketTypes.adults * 85 + this.ticketTypes.seniors * 75 + this.ticketTypes.juniors * 65);
  }

  randomBookNumber () {
    let text = '';
    let randomCode = '0123456789';

    for (let i = 0; i < 12; i++) {
      text += randomCode.charAt(Math.floor(Math.random() * randomCode.length));
    }
    return text;
  }
}
