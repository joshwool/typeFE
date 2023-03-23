import * as gen from "./words/generate"
import * as input from "./input/input"
import * as display from "./words/display"
import "../styles/index.scss"
import $ from "jquery"
import * as http from "http";

if ($("#wordDis").outerWidth() + screen.width*0.1 > window.innerWidth) {
    $("#wordDis").width(window.innerWidth*0.9)
}
else {
    $("#wordDis").width(screen.width*0.7);
}

gen.genLines(4);

display.wordsFocus();

display.resize();
display.resizeLines();

input.KeyDown();


