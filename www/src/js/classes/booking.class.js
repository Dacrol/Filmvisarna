import Base from './base.class';

class Booking extends Base {
  constructor (screening, app) {
    super();
    this.screening = screening;
    this.user = app.currentUser;
  }
  // visa ut salongen du valt

  // vilken rad o number kanske via att ta emot salongobjektet

  // visa ut tiden

  // visa ut priset

  // vilken film
  // skapa en booknings json fil

  randomBookNumber () {
    let text = '';
    let randomCode = '0123456789';

    for (let i = 0; i < 10; i++) {
      text += randomCode.charAt(Math.floor(Math.random() * randomCode.length));
    }
    return text;
  }

  template1 () {
    return `

      <div>
        ${this.randomBookNumber()}
      </div>



    `;
  }
}
