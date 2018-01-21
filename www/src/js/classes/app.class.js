import PopStateHandler from './pop-state-handler.class.js';
import Renderer from './renderer-base.class';

class App extends Renderer {
  constructor () {
    // TODO: Don't use new for side effects
    // eslint-disable-next-line
    new PopStateHandler();
    console.log('detta fungerar');
    super();
  }
}

export default App;
