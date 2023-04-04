import * as ws from "../websocket/websocket";

export function Response() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response.result === 1) {
      if (response.operation === 10) {
        // Receive leaderboard entries
        for (let i = 0; i < response.rows.length; i++) {
          // Update leaderboard with entries
          $("#leaderboard").append(
            "<div class='row'><div class='username'>" +
              response.rows[i][0] + // Username
              "</div><div class='wpm'>" +
              response.rows[i][1]["wpm"].toFixed(1) + // Words Per Minute
              "</div><div class='accuracy'>" +
              response.rows[i][1]["accuracy"].toFixed(2) + // Accuracy
              "</div></div>"
          );
        }
      }
    }
  };
}
