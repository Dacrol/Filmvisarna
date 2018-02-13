// import PopStateHandler from './pop-state-handler.class.js';
import Renderer from './renderer-base.class';
import LogInHandler from './log-in-handler.class.js';

class App extends Renderer {
  constructor () {
    super();
    this.logInHandler = new LogInHandler(this);
    this.currentUser = null;
    this.currentBooking = null;
    this.allBookings = [];
  }

  /**
   * Loads currentUser from session, etc.
   *
   * @memberof App
   */
  initializePage () {
    this.logInHandler.checkIfLoggedIn().then((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }
}

export default App;
