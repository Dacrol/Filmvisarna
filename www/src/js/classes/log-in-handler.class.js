import Base from './base.class';
import App from './app.class.js';
import User from './user.class.js';

export default class LogInHandler extends Base {
  constructor (App) {
    super();
    this.app = App;
    this.signInButton = $('#sign-in');
    this.render('body', '1');
    this.setupEventHandlers();
  }

  setupEventHandlers () {
    $('#sign-in').click(function (event) {
      event.preventDefault();

      // @ts-ignore
      $('#login-modal').modal('toggle');

      $('#sign-in-submit').on('click', function (event) {
        event.preventDefault();
        this.app.logInHandler.logIn();
      });
      $('#login-modal').keyup(function (event) {
        if (event.which === 13) {
          event.preventDefault();
          this.app.logInHandler.logIn();
        }
      });
    });
  }

  async logIn () {
    let userName = $('#email').val();
    let passWord = $('#password').val();
    // @ts-ignore
    this.allUserNames = await JSON._load('users.json');
    for (let user of this.allUserNames) {
      if (user.id === userName) {
        if (user.password === passWord) {
          this.app.bindViewWithJSON(
            '#sign-in-submit',
            'mypage',
            '/mypage',
            '/json/movie-data.json',
            'movies',
            null,
            () => {
              let that = this;
              $('#sign-out').on('click', function (event) {
                event.preventDefault();
                that.signOut();
              });
            }
          );
          sessionStorage.setItem('signed-in', JSON.stringify(user));
          if (sessionStorage.getItem('signed-in')) {
            $('#sign-in')
              .parent()
              .remove();
            $('ul.navbar-nav').append(
              '<li class="nav-item"><a class="nav-link pop" id="sign-in" data-toggle="pill" href="/mypage" role="tab" data-target="#login-modal" aria-controls="pills-mypage" aria-selected="false">Mina sidor</a></li>'
            );
            $('#login-modal').modal('hide');
            this.app.changePage('mypage');
          }
        }
      }
    }
  }
  signOut () {
    sessionStorage.removeItem('signed-in');
    $('#sign-in')
      .parent()
      .remove();

    $('ul.navbar-nav').append(
      '<li class="nav-item"><a class="nav-link" id="sign-in" data-toggle="pill" href="/mypage" role="tab" data-target="#login-modal" aria-controls="pills-mypage" aria-selected="false">Logga in</a></li>'
    );
    $('#sign-in').on('click', (event) => {
      // @ts-ignore
      $('#login-modal').modal('toggle');

      /*  $('#sign-in-submit').on('click', event => {
        event.preventDefault();
        this.logIn();
      }); */
      // $('#login-modal').keyup(e => {
      //   if (e.which === 13) {
      //     event.preventDefault();
      //     this.app.logInHandler.logIn();
      //   }
      // });
    });

    this.app.changePage('/');
  }

  registerUser () {
    let userName = $('#email').val();
    let passWord = $('#password').val();
    let passWordMatch = $('#password-match').val();

    if (passWord === passWordMatch) {
      User.createNewUser(userName, passWord).then(function (user) {
        console.log(user);
      });
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
                  <label for="email">E-post</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="password">Lösenord</label>
                  <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="password-match">Lösenord</label>
                  <input type="password" class="form-control" id="password-match" placeholder="Password">
                </div>
                <a id="sign-in-submit" href="#" role="button" class="btn btn-primary">Submit</a>
                <a id="register-user" href="#" role="button" class="btn btn-primary">Registrera dig</a>
                <a id="register-user-submit" href="#" role="button" class="btn btn-primary">Submit reg</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
