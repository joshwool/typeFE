import "jquery";
import * as gen from "../words/generate";
import * as input from "../input/input";
import * as display from "../words/display";
import * as settings from "../settings/settings";
import "../../styles/pages/index.scss";

$(() => {
  $("#wordInp").val("");

  if ($("#wordDis").outerWidth() + screen.width * 0.1 > window.innerWidth) {
    $("#wordDis").width(window.innerWidth * 0.9);
  } else {
    $("#wordDis").width(screen.width * 0.7);
  }

  gen.genLines(4);

  display.wordsFocus();

  display.resize();
  display.resizeLines();

  input.KeyDown();

  settings.Settings();

  const testSocket = new WebSocket("ws://localhost:80");

  testSocket.addEventListener("open", (event) => {
    console.log("Connection created");
    testSocket.send("Test123");
    testSocket.send("Hello 123");
  });

  testSocket.onmessage = (event) => {
    console.log(event.data);
  };
});
