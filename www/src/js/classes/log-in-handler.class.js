import Base from './base.class';
import User from './user.class.js';
const MD5 = require('crypto-js/md5');

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
      that.logIn().then((user) => {
        console.log(user);
        if (user === null) {
          $('#login-form input').addClass('is-invalid');
        }
      });
    });
    $('#login-modal').keyup(function (event) {
      if (event.which === 13) {
        event.preventDefault();
        that.logIn().then((user) => {
          console.log(user);
          if (user === null) {
            $('#login-form input').addClass('is-invalid');
          }
        });
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
          return user;
        }
      }
    }
    return null;
  }
  confirmLogIn (user) {
    let session = MD5(user.id);
    user.session = session;
    sessionStorage.setItem('signed-in', JSON.stringify(session));
    this.currentUser = user;
    this.checkIfLoggedIn(user).then((user) => {
      if (user) {
        $('#login-modal').modal('hide');
        this.app.changePage('mypage');
      }
    });
  }

  async checkIfLoggedIn (user = null) {
    let session = sessionStorage.getItem('signed-in');
    if (session) {
      $('#sign-in')
        .parent()
        .remove();
      $('ul.navbar-nav').append(
        '<li class="nav-item"><a class="nav-link pop" id="sign-in" data-toggle="pill" href="/mypage" role="tab" aria-controls="pills-mypage" aria-selected="false">Mina sidor</a></li>'
      );
      if (!user) {
        let allUserNames = await JSON._load('users.json');
        user = allUserNames.find((user) => {
          return MD5(user.id) === session;
        });
      }
      if (user) {
        this.currentUser = user;
        return user;
      } else {
        this.signOut();
        return null;
      }
    }
  }
  signOut () {
    sessionStorage.removeItem('signed-in');
    this.currentUser = null;
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
          $('#login-modal .tab-pane, #login-modal .nav-link').toggleClass(
            'show active'
          );
        })
        .catch(() => {
          $('#register-form').removeClass('was-validated');
          // console.log('Username taken');
          $('#email-register').addClass('is-invalid');
          $('#register-email-feedback').text('E-posten används redan.');
          // console.log(error);
        });
    } else {
      $('#register-form').removeClass('was-validated');
      $('#password-match').addClass('is-invalid');
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
                  <div class="invalid-feedback">
                  Lösenord eller e-post stämmer inte.
                </div>
                </div>
                <button id="sign-in-submit" class="btn btn-primary" type="submit">Logga in</button>
              </form>
            </div>
          </div>
          <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
              <div class="modal-body">
                  <form id="register-form"  class="needs-validation" novalidate>
                    <div class="form-group">
                      <label for="email-register">E-post</label>
                      <input type="email" class="form-control" pattern=".+@.+..+" required id="email-register" aria-describedby="emailHelp" placeholder="E-post">

                  <div class="invalid-feedback" id="register-email-feedback">
                  Ogiltig e-post.
                </div>
                    </div>
                    <div class="form-group">
                      <label for="password-register">Lösenord</label>
                      <input type="password" class="form-control" id="password-register" placeholder="Lösenord">
                    </div>
                    <div class="form-group">
                      <label for="password-match">Upprepa lösenord</label>
                      <input type="password" class="form-control" id="password-match" placeholder="Upprepa lösenord">
                      <div class="invalid-feedback">
                  Lösenorden matchar inte.
                </div>
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
