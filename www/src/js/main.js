import 'babel-polyfill';
import jQuery from '../../../node_modules/jquery/dist/jquery.js';
import '../../../node_modules/popper.js/dist/umd/popper.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './classes/app.class.js';
import viewsSetup from './helpers/views-setup';
import patchOwlCarousel from './helpers/owl-patch';

// @ts-ignore
require('jsrender')(jQuery);
// jQuery.views.settings.allowCode(true);

// @ts-ignore
window.$ = window.jQuery = jQuery;
// @ts-ignore
require('../../../node_modules/owl.carousel/dist/owl.carousel');

// @ts-ignore
window.$.owlCarousel = window.$.fn.owlCarousel;
// @ts-ignore
$.owlCarousel = $.fn.owlCarousel;

let app = new App();

viewsSetup(app);

patchOwlCarousel('&iv_load_policy=3&rel=0&showinfo=1&controls=1');

$('#sign-in').click(function () {
  app.LogInHandler.render('#root', 1);
  $('#exampleModal').modal();


});
