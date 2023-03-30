import "jquery";
import * as input from "../input/input";
import * as display from "../words/display";
import * as popups from "../popups/popups";
import "../../styles/pages/index.scss";
import * as onload from "../onload/onload";
import * as response from "../response";

$(() => {
  onload.IndexOnload();
  response.Index();

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
  display.ResetButton();

  input.KeyDown();

  popups.Settings();
});
