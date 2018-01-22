import jQuery from '../../../node_modules/jquery/dist/jquery.js';
import '../../../node_modules/popper.js/dist/umd/popper.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './classes/app.class.js';
import viewsSetup from './misc/views-setup';

// @ts-ignore
require('jsrender')(jQuery);
// @ts-ignore
window.$ = window.jQuery = jQuery;

// classes
let app = new App();
viewsSetup(app);
