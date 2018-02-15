import 'babel-polyfill';
import jQuery from '../../../node_modules/jquery/dist/jquery.js';
import '../../../node_modules/popper.js/dist/umd/popper.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './classes/app.class.js';
import viewsSetup from './helpers/views-setup';
import patchOwlCarousel from './helpers/owl-patch';
import User from './classes/user.class.js';

// @ts-ignore
require('jsrender')(jQuery);

// @ts-ignore
window.$ = window.jQuery = jQuery;
// @ts-ignore
require('../../../node_modules/owl.carousel/dist/owl.carousel');
// @ts-ignore
require('jquery-ui/ui/effect');
// @ts-ignore
require('jquery-ui/ui/effects/effect-scale');
// @ts-ignore
require('jquery-ui/ui/effects/effect-size');
// @ts-ignore
require('jquery-ui/ui/effects/effect-puff');

// @ts-ignore
window.$.owlCarousel = window.$.fn.owlCarousel;
// @ts-ignore
$.owlCarousel = $.fn.owlCarousel;

let app = new App();
app.initializePage();

// @ts-ignore
window.app = app;

viewsSetup(app);

JSON._classes(User);

patchOwlCarousel('&iv_load_policy=3&rel=0&showinfo=1&controls=1');

/* if (sessionStorage.getItem('signed-in')) {
  $('#sign-in')
    .parent()
    .remove();
  $('ul.navbar-nav').append(
    '<li class="nav-item"><a class="nav-link pop" id="sign-in" data-toggle="pill" href="/mypage" role="tab" data-target="#login-modal" aria-controls="pills-mypage" aria-selected="false">Mina sidor</a></li>'
  );
} */


$('#register-user-submit').on('click', (e) => {
  e.preventDefault();
  let form = $('#register-form')
    .first()
    .get()[0];
  // form.classList.add('was-validated');
  // @ts-ignore
  if (form.checkValidity()) {
    app.logInHandler.registerUser();
  } else {
    $('#email-register').addClass('is-invalid');
    $('#register-email-feedback').text('Ogiltig e-post.');
  }
});
