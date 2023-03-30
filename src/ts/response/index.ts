import * as ws from "../websocket/websocket";
import * as gen from "../words/generate";
import * as change from "../config/change";
import * as config from "../config/config";
import * as setup from "../typing/setup";

export function Index() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response.result === 1) {
      // Checks if operation was successful
      if (response.operation === 3) {
        config.typeConfig.mode = response.config.mode;
        config.typeConfig.type = response.config.type;
        config.typeConfig.number = response.config.number;

        setup.GenTest();
      } else if (response["operation"] === 6) {
        gen.genPractice(response["words"]);
      }
    } else {
      for (let i = 0; i < response.errmsgs.length; i++) {
        // Alert users to any errors that have occurred
        alert(response.errmsgs[i]);
      }
      if (response.operation === 6) {
        config.typeConfig.type = "test";
        change.Config(); // If creating the practice set errors then revert to test mode and update config to prevent confusion
      }
      setup.GenTest();
    }
  };
}
