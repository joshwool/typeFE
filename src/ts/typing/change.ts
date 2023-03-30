import { typeConfig } from "../config/config";
import * as setup from "./setup";
import * as ws from "../websocket/websocket";

export function Mode(mode: string, type: string, number: number) {
  typeConfig.mode = mode;
  typeConfig.type = type;
  typeConfig.number = number;

  if (ws.websocket.readyState === 1) {
    ws.websocket.send(
      JSON.stringify({
        operation: 4,
        config: "type_config",
        values: typeConfig,
      })
    );
  } else {
    alert("Server down, please try again later.");
  }

  setup.GenTest();
}
