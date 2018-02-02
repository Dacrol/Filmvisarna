import Base from './base.class';

export default class LogInHandler extends Base {
  constructor () {
    super();
    this.signedIn = false;
    this.signInButton = $('#sign-in');
  }

  logIn () {
    // först plockar vi upp värdena i formuläret
    let userName = $('#exampleInputEmail1').val();
    let passWord = $('#exampleInputPassword1').val();
      console.log(userName);
      console.log(passWord);


    // sedan jämför vi värdena i json-filen

    // sedan om det matchar rendederar vi ut en ny vy

    // och skapar en ny session
  }

  template1 () {
    return `
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
