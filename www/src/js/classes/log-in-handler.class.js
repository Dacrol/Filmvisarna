import Base from './base.class';
import App from './app.class.js';

export default class LogInHandler extends Base {
  constructor (App) {
    super();
    this.app = App;
    this.signInButton = $('#sign-in');
  }

  async logIn () {
    let userName = $('#exampleInputEmail1').val();
    let passWord = $('#exampleInputPassword1').val();
    // @ts-ignore
    this.allUserNames = await JSON._load('users.json');
    // först plockar vi upp värdena i formuläret

    for (let user of this.allUserNames) {
      if (user.id === userName) {
        if (user.password === passWord) {
          // $('#root').html();
          $('.modal-backdrop').css('display', 'none');
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
                console.log('fewfewfewfwe');
                event.preventDefault();
                that.signOut();
              });
            }
          );
          sessionStorage.setItem('signed-in', JSON.stringify(user));
          this.app.changePage('mypage');
          if (sessionStorage.getItem('signed-in')) {
            $('#sign-in')
              .parent()
              .remove();
            $('ul.navbar-nav').append(
              '<li class="nav-item"><a class="nav-link pop" id="sign-in" data-toggle="pill" href="/mypage" role="tab" data-target="#login-modal" aria-controls="pills-mypage" aria-selected="false">Mina sidor</a></li>'
            );
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
    $('ul.navbar-nav')
      .append(
        '<li class="nav-item"><a class="nav-link" id="sign-in" data-toggle="pill" href="/mypage" role="tab" data-target="#login-modal" aria-controls="pills-mypage" aria-selected="false">Logga in</a></li>'
      )
      .on('click', (event) => {
        this.render('#root', 1);
        // @ts-ignore
        $('#login-modal').modal();

        $('#sign-in-submit').on('click', (event) => {
          event.preventDefault();
          this.logIn();
        });
        $('#login-modal').keyup((e) => {
          if (e.which === 13) {
            event.preventDefault();
            this.app.logInHandler.logIn();
          }
        });
      });

    this.app.changePage('/');
  }

  template1 () {
    return `
      <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <form id="test" action="post">
                <div class="form-group">
                  <label for="exampleInputEmail1">E-post</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Lösenord</label>
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

  template2 () {
    return `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <form id="test" action="post">
              <div class="form-group">
                <label for="exampleInputEmail1">E-post address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Lösenord</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2">Bekäfta ditt nya lösenord</label>
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
