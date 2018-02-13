// import PopStateHandler from './pop-state-handler.class.js';
import Renderer from './renderer-base.class';
import LogInHandler from './log-in-handler.class.js';

class App extends Renderer {
  constructor () {
    super();
    this.logInHandler = new LogInHandler(this);
    this.currentBooking = null;
    this.allBookings = [];
  }
}

export default App;
