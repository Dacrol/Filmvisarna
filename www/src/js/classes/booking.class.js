import Base from './base.class';

class Booking extends Base {

  // visa ut salongen du valt

  // visa ut tiden

  // visa ut priset

  // vilken film

  async screenings (index) {
    let screenings = await JSON._load('screenings.json');

    let c = 0;
    for (let movie of screenings) {
      if (c === index) {
        console.log(movie);
        this.render('#root', '1');
      }
      c++;
    }
  }

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
