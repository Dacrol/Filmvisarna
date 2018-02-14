export default class Booking {
  constructor (screening, app) {
    this.screening = screening;
    this.user = app.logInHandler.currentUser;
  }


  randomBookNumber () {
    let text = '';
    let randomCode = '0123456789';

    for (let i = 0; i < 10; i++) {
      text += randomCode.charAt(Math.floor(Math.random() * randomCode.length));
    }
    return text;
  }


}
