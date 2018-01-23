import jQuery from '../../../node_modules/jquery/dist/jquery.js';
import '../../../node_modules/popper.js/dist/umd/popper.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './classes/app.class.js';
import viewsSetup from './helpers/views-setup';




// @ts-ignore
require('jsrender')(jQuery);
// let owlCarousel = require("owl.carousel")(jQuery);
// @ts-ignore
window.$ = window.jQuery = jQuery;
require("../../../node_modules/owl.carousel/dist/owl.carousel");
// classes
let app = new App();

window.$.owlCarousel = window.$.fn.owlCarousel;
viewsSetup(app);

