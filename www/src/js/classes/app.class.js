// import PopStateHandler from './pop-state-handler.class.js';
import Renderer from './renderer-base.class';
import LogInHandler from './log-in-handler.class.js';

class App extends Renderer {
  constructor () {
    super();
    this.logInHandler = new LogInHandler(this);
    // this.currentUser = null; // Moved to getter
    this.currentBooking = null;
    this.allBookings = [];
  }

  get currentUser () {
    return this.logInHandler.currentUser;
  }

  /**
   * Loads currentUser from session, etc.
   *
   * @memberof App
   */
  initializePage () {
    return this.logInHandler.verifySession();
  }
}

export default App;
