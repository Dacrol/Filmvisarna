import Base from './base.class';
import User from './user.class.js';

export default class LogInHandler extends Base {
  constructor (app) {
    super();
    this.app = app;
    this.signInButton = $('#sign-in');
    this.currentUser = null;
    this.render('body', '1');
    this.setupEventHandlers();
  }

  setupEventHandlers () {
    const that = this;
    $('#sign-in').click(function (event) {
      event.preventDefault();
      // @ts-ignore
      $('#login-modal').modal('toggle');
    });
    $('#sign-in-submit').on('click', function (event) {
      event.preventDefault();
      that.logIn();
    });
    $('#login-modal').keyup(function (event) {
      if (event.which === 13) {
        event.preventDefault();
        that.logIn();
      }
    });
  }

  async logIn () {
    let userName = $('#email').val();
    // @ts-ignore
    let password = User.encrypt($('#password').val()).words.join();
    // @ts-ignore
    let allUserNames = await JSON._load('users.json');
    for (let user of allUserNames) {
      if (user.id === userName) {
        if (user.password.words.join() === password) {
          this.confirmLogIn(user);
        }
      }
    }
  }
  confirmLogIn (user) {
    sessionStorage.setItem('signed-in', JSON.stringify(user));
    this.currentUser = user;
    this.checkIfLoggedIn();
    $('#login-modal').modal('hide');
    this.app.changePage('mypage');
  }

  checkIfLoggedIn () {
    if (sessionStorage.getItem('signed-in')) {
      $('#sign-in')
        .parent()
        .remove();
      $('ul.navbar-nav').append(
        '<li class="nav-item"><a class="nav-link pop" id="sign-in" data-toggle="pill" href="/mypage" role="tab" aria-controls="pills-mypage" aria-selected="false">Mina sidor</a></li>'
      );
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
    });
    this.app.changePage('/');
  }

  registerUser () {
    let userName = $('#email-register').val();
    let password = $('#password-register').val();
    let passwordMatch = $('#password-match').val();

    if (password === passwordMatch) {
      User.createAndSaveNewUser(userName, password)
        .then((user) => {
          // console.log('User created:', user);
          this.confirmLogIn(user);
          $('#login-modal .tab-pane').toggleClass('show active');
        })
        .catch(() => {
          console.log('Username taken');
          $('#email-register').addClass(' is-invalid');
          // console.log(error);
        });
    }
  }

  template1 () {
    return `<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

      <ul class="nav nav-tabs nav-fill" id="login-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login">Logga in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="register-tab" data-toggle="tab" href="#register">Registrera dig</a>
        </li>
      </ul>
      <div class="tab-content" id="login-tabs-content">
          <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
            <div class="modal-body">
              <form id="login-form">
                <div class="form-group">
                  <label for="email">E-post</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-post">
                </div>
                <div class="form-group">
                  <label for="password">Lösenord</label>
                  <input type="password" class="form-control" id="password" placeholder="Lösenord">
                </div>
                <button id="sign-in-submit" class="btn btn-primary" type="submit">Logga in</button>
              </form>
            </div>
          </div>
          <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
              <div class="modal-body">
                  <form id="register-form">
                    <div class="form-group">
                      <label for="email-register">E-post</label>
                      <input type="email" class="form-control" id="email-register" aria-describedby="emailHelp" placeholder="E-post">
                    </div>
                    <div class="form-group">
                      <label for="password-register">Lösenord</label>
                      <input type="password" class="form-control" id="password-register" placeholder="Lösenord">
                    </div>
                    <div class="form-group">
                      <label for="password-match">Upprepa lösenord</label>
                      <input type="password" class="form-control" id="password-match" placeholder="Upprepa lösenord">
                    </div>
                    <button id="register-user-submit" class="btn btn-primary" type="submit">Registrera dig</button>
                  </form>
                </div>
          </div>
        </div>
    </div>
  </div>
</div>`;
  }
}
