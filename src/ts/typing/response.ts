import * as ws from "../websocket/websocket";
import * as gen from "../words/generate";
import * as change from "./change";
import * as config from "../config/config";
import * as setup from "./setup";

export function Response() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response.result === 1) {
      // Checks if operation was successful
      if (response.operation === 3) {
        config.typeConfig.mode = response.config.mode;
        config.typeConfig.type = response.config.type;
        config.typeConfig.number = response.config.number;

        setup.GenTest();
      } else if (response["operation"] === 4) {
        gen.genPractice(response["words"]);
      }
    } else {
      for (let i = 0; i < response.errmsgs.length; i++) {
        alert(response.errmsgs[i]);
      }
      change.Mode("test", config.typeConfig.type, config.typeConfig.number); // If creating the practice set errors then revert to test mode and update config to prevent confusion

      setup.GenTest();
    }
  };
}
