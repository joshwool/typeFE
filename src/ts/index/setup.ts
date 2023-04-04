import * as config from "../config/config";
import * as gen from "./generate";
import * as ws from "../websocket/websocket";

export function GenTest() {
  $("#wordDis").empty();

  if (config.typeConfig.mode === "test") {
    gen.genLines(4);
  } else if (config.typeConfig.mode === "practice") {
    if (localStorage.getItem("sessionId") === null) {
      config.typeConfig.mode = "test";
      alert("Practice mode is not available when not logged in.");
      GenTest();
    } else {
      let number = 50; // Default words generated is 50 for time tests
      if (config.typeConfig.type === "words") {
        number = Number(config.typeConfig.number);
      }
      if (ws.websocket.readyState === 1) {
        ws.websocket.send(
          JSON.stringify({
            operation: 6, // Request Practice word set
            sessionId: localStorage.getItem("sessionId"), // Sends across sessionId so user data can be accessed
            number: number,
          })
        );
      } else {
        alert("Server down, please try again later.");
      }
    }
  }
}
