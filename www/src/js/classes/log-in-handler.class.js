import Base from './base.class';
import App from './app.class.js';

export default class LogInHandler extends Base {
  constructor (App) {
    super();
    this.app = App;
    this.signedIn = false;
    this.signInButton = $('#sign-in');
  }

  async logIn () {
    let userName = $('#exampleInputEmail1').val();
    let passWord = $('#exampleInputPassword1').val();
    this.allUserNames = await JSON._load('users.json');
    // först plockar vi upp värdena i formuläret

    for (let user of this.allUserNames) {
      if (user.id === userName) {
        if (user.password === passWord) {
          // $('#root').html();
          $('.modal-backdrop').remove();
          this.app.bindViewWithJSON(
            '#sign-in-submit',
            'mypage',
            '/mypage',
            '/json/movie-data.json',
            'movies'
          );
          this.app.changePage('mypage');


          // sedan om det matchar rendederar vi ut en ny vy

          // och skapar en ny session

          // redirecta till sidan som är mina sidor
        }
      }
    }
  }

  template1 () {
    return `
      <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <form id="test" action="post">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <a id="sign-in-submit" href="#" role="button" class="btn btn-primary">Submit</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // behöver skapa en loggga ut metod

  // en metod som kollar om du är inloggad

  // renedera ut formuläret
}
