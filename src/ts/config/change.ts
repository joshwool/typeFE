import * as config from "./config";
import * as setup from "../typing/setup";
import * as ws from "../websocket/websocket";

export function Config() {
  if (localStorage.getItem("sessionId") !== null) {
    if (ws.websocket.readyState === 1) {
      ws.websocket.send(
        JSON.stringify({
          operation: 4,
          sessionId: localStorage.getItem("sessionId"),
          config: "test_config",
          values: config.typeConfig,
        })
      );
    } else {
      alert("Server down, please try again later.");
    }
  }

  setup.GenTest();
}
