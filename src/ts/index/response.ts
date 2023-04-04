import * as ws from "../websocket/websocket";
import * as gen from "./generate";
import * as change from "../config/change";
import * as config from "../config/config";
import * as setup from "./setup";
import { lastTestData } from "./input";

export function Response() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response.result === 1) {
      // Checks if operation was successful
      if (response.operation === 3) {
        // General config receive
        // Update config
        config.typeConfig.mode = response.config.mode;
        config.typeConfig.type = response.config.type;
        config.typeConfig.number = response.config.number;
        setup.GenTest();
      } else if (response.operation === 6) {
        // Practice word set receive
        gen.genPractice(response["words"]);
      } else if (response.operation === 7) {
        // Test key scores receive
        let worstScore = 0;

        for (let i = 0; i < 26; i++) {
          if (response.keyScores[i] > worstScore) {
            worstScore = response.keyScores[i];
          }
        }

        for (let i = 0; i < 26; i++) {
          if (lastTestData.keys[i][0] > 0) {
            let relativeScore = (
              (1 - response.keyScores[i] / worstScore) *
              10
            ).toFixed(1); // Produces a score for each character relative to the worse character
            let accuracy = (
              ((lastTestData.keys[i][1] - lastTestData.keys[i][2]) /
                lastTestData.keys[i][1]) *
              100
            ).toFixed(1);

            let keyInfo =
              "<div class='keyinfo'>" +
              String.fromCharCode(65 + i) +
              ": Relative Score: " +
              relativeScore +
              ", Avg Time: " +
              Math.round(lastTestData.keys[i][0]) +
              "ms, Accuracy: " +
              accuracy +
              "%" +
              "</div>";

            $("#keyData").append(keyInfo);
          }
        }
      }
    } else {
      for (let i = 0; i < response.errmsgs.length; i++) {
        // Alert users to any errors that have occurred
        alert(response.errmsgs[i]);
      }
      if (response.operation === 6) {
        // Practice word set request
        config.typeConfig.type = "time";
        change.Config(); // If creating the practice set errors then revert to test mode and update config to prevent confusion
      }

      setup.GenTest();
    }
  };
}
