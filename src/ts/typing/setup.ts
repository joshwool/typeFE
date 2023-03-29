import { typeConfig } from "../config/config";
import * as gen from "../words/generate";
import * as ws from "../websocket/websocket";
import { type } from "jquery";

export function GenTest() {
  $("#wordDis").empty();
  if (typeConfig.mode === "test") {
    gen.genLines(4);
  } else if (typeConfig.mode === "practice") {
    if (localStorage.getItem("sessionId") !== null) {
      typeConfig.mode = "test";
      alert("Practice mode is not available when not logged in.");
      GenTest();
    } else {
      let number = 50; // Default words generated is 50 for time tests
      if (typeConfig.type === "words") {
        number = typeConfig.number;
      }
      ws.websocket.send(
        JSON.stringify({
          operation: 4, // Request Practice word set
          sessionId: localStorage.getItem("sessionId"), // Sends across sessionId so user data can be accessed
          number: number,
        })
      );
    }
  }
}
