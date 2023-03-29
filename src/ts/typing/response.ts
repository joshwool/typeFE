import * as ws from "../websocket/websocket";
import * as gen from "../words/generate";
import * as change from "./change";
import { typeConfig } from "../config/config";
import * as setup from "./setup";

export function Response() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response["result"] === 1) {
      // Operation was a success
      if (response["operation"] === 4) {
        gen.genPractice(response["words"]);
      }
    } else {
      for (let i = 0; i < response.errmsgs.length; i++) {
        alert(response.errmsgs[i]);
      }
      typeConfig.mode = "test"; // If creating the practice set errors then revert to test mode
      setup.GenTest();
    }
  };
}
