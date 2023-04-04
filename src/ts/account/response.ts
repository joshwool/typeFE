import * as ws from "../websocket/websocket";

export function Response() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response.result === 1) {
      if (response.operation === 3) {
        // General Config Receive
        // Update Page with info
        $("#name").text(response.config.username);
        console.log(response.config);
        $("#bestwpm").text("Best WPM: " + response.config.bestwpm.toFixed(2));
        $("#avgwpm").text("Average WPM: " + response.config.avgwpm.toFixed(2));
        $("#avgaccuracy").text(
          "Average Accuracy: " + response.config.avgacc.toFixed(2) + "%"
        );
        $("#tests").text("Total Tests: " + response.config.tests);
      }
      if (response.operation === 8) {
        // Key scores and practice config receive
        // Update config with change
        let worstScore = 0;

        for (let i = 0; i < 26; i++) {
          if (response.keyScores[i] > worstScore) {
            worstScore = response.keyScores[i];
          }
        }

        for (let i = 0; i < 26; i++) {
          if (response.keyData[i][0] > 0) {
            let relativeScore = (
              (1 - response.keyScores[i] / worstScore) *
              10
            ).toFixed(1); // Produces a score for each character relative to the worse character
            let accuracy = (
              ((response.keyData[i][1] - response.keyData[i][2]) /
                response.keyData[i][1]) *
              100
            ).toFixed(1);

            let keyInfo =
              "<div class='keyinfo'>" +
              String.fromCharCode(65 + i) +
              ": Relative Score: " +
              relativeScore +
              ", Avg Time: " +
              Math.round(response.keyData[i][0]) +
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
        alert(response.errmsgs[i]);
      }
    }
  };
}
