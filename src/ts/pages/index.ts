import "jquery";
import * as gen from "../words/generate";
import * as input from "../input/input";
import * as display from "../words/display";
import * as settings from "../settings/settings";
import "../../styles/pages/index.scss";

$(() => {
  $("#wordInp").val("");

  let wordDis = $("#wordDis");

  if (wordDis.outerWidth() + screen.width * 0.1 > window.innerWidth) {
    wordDis.width(window.innerWidth * 0.9);
  } else {
    wordDis.width(screen.width * 0.7);
  }

  display.wordsFocus();

  display.resize();
  display.resizeLines();

  input.KeyDown();

  settings.Settings();
});
