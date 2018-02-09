// import PopStateHandler from './pop-state-handler.class.js';
import Renderer from './renderer-base.class';
import LogInHandler from '../classes/log-in-handler.class.js';

class App extends Renderer {
  constructor () {
    super();
    this.logInHandler = new LogInHandler(this);
  }
}

export default App;
