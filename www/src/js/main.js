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

// @ts-ignore
window.$.owlCarousel = window.$.fn.owlCarousel;
// @ts-ignore
$.owlCarousel = $.fn.owlCarousel;

let app = new App();

viewsSetup(app);

patchOwlCarousel('&iv_load_policy=3&rel=0&showinfo=0&controls=1');

/**
 * Patches the Owl Carousel play function by appending additional YouTube parameters
 *
 * @param {string} additionalParams Parameters to append to the generated iframes
 * @see {@link https://developers.google.com/youtube/player_parameters}
 */
function patchOwlCarousel (additionalParams) {
  const playFn =
    // @ts-ignore
    window.$.fn.owlCarousel.prototype.constructor.Constructor.Plugins.Video
      .prototype.play;
  // @ts-ignore
  window.$.fn.owlCarousel.prototype.constructor.Constructor.Plugins.Video.prototype.play = function (
    event
  ) {
    playFn.apply(this, arguments);
    let src = $('.owl-video-frame')
      .children()
      .first()
      .prop('src');
    console.log(src);
    $('.owl-video-frame')
      .children()
      .first()
      .prop('src', src + additionalParams);
  };
}
