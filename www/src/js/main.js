import jQuery from "../../../node_modules/jquery/dist/jquery.js";
window.$ = window.jQuery = jQuery;
require('jsrender')($);
import "../../../node_modules/popper.js/dist/umd/popper.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Test from "./classes/test.class.js";

//classes
let test = new Test();