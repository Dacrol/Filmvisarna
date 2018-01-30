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

// @ts-ignore
window.$.owlCarousel = window.$.fn.owlCarousel;
viewsSetup(app);
$.owlCarousel = $.fn.owlCarousel;

let app = new App();

// setTimeout(function(){

// $(document).ready(function() {

// });

// }, 3000);

function pauseYT () {
  let iframe = $('.owl-item').find('iframe');

  let command = {
    event: 'command',
    func: 'pauseVideo'
  };

  iframe.each(function () {
    console.log(this, 'derr');
    console.log(this.contentWindow, 'derr');
    this.contentWindow.postMessage(JSON.stringify(command), '*');
  });
}
