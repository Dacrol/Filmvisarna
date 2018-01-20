import jQuery from "../../../node_modules/jquery/dist/jquery.js";
window.$ = window.jQuery = jQuery;
require('jsrender')($);
import render from "./misc/render.js";
import "../../../node_modules/popper.js/dist/umd/popper.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import App from "./classes/app.class.js";

render();

//classes
let app = new App();