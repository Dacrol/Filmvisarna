import jQuery from "../../../node_modules/jquery/dist/jquery.js";
import "../../../node_modules/popper.js/dist/umd/popper.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Test from "./classes/test.class.js";


//jQuery 
window.$ = window.jQuery = jQuery;

//classes
let test = new Test();

$('body').css('background', 'red');