import * as config from "./config";
import * as setup from "../index/setup";
import * as ws from "../websocket/websocket";

export function Config() {
  if (localStorage.getItem("sessionId") !== null) {
    // Checks if there is a session id
    if (ws.websocket.readyState === 1) {
      // Checks if WebSocket connection is open
      ws.websocket.send(
        JSON.stringify({
          operation: 4, // General Config Update
          sessionId: localStorage.getItem("sessionId"),
          config: "test_config", // Updates the test_config
          values: config.typeConfig,
        })
      );
    } else {
      alert("Server down, please try again later.");
    }
  }

  setup.GenTest();
}

export function ResetTypeData() {
  // Reset typeData
  config.typeData.wpm = 0;
  config.typeData.acc = 0;
  config.typeData.totalPresses = 0;
  config.typeData.errors = 0;

  for (let i = 0; i < 26; i++) {
    config.typeData.keys[i] = [0, 0, 0];
  }
}
