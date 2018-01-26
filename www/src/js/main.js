import 'babel-polyfill';
import jQuery from '../../../node_modules/jquery/dist/jquery.js';
import '../../../node_modules/popper.js/dist/umd/popper.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './classes/app.class.js';
import viewsSetup from './helpers/views-setup';

// @ts-ignore
require('jsrender')(jQuery);
// jQuery.views.settings.allowCode(true);

// @ts-ignore
window.$ = window.jQuery = jQuery;
// @ts-ignore
require('../../../node_modules/owl.carousel/dist/owl.carousel');

// classes
let app = new App();

// @ts-ignore
window.$.owlCarousel = window.$.fn.owlCarousel;
viewsSetup(app);
